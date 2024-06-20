import { action, mutation, query } from './_generated/server'
import { ConvexError, v } from "convex/values"
import { api, internal } from '../convex/_generated/api'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});


// all the functions relating to querying the convex db

// handler function - function that executes the query logic ; what should happen when the query is executed

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// to have docs displayed back from the database
export const getDocuments = query({
  async handler(ctx) {

    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
    console.log(userId)
    
    if(!userId) {
      return []
    }
  // query the table where every record where that token identifier matches the userId
    return await ctx.db.query('documents').withIndex('by_tokenIdentifier', 
    (query) => query.eq('tokenIdentifier', userId)).collect()
  }
})

// retrieve single document from the db
export const getDocument = query({
  args: {
    documentId: v.id('documents')
  },

  // verify that user is logged in
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
    console.log(userId)

    
    if(!userId) {
      return null
    }

    const document = await ctx.db.get(args.documentId)

    if(!document) {
      return null
    }

    if(document.tokenIdentifier !== userId) {
      return null
    }

  // query the table where every record where that token identifier matches the userId
    return {...document, 
      documentUrl: await ctx.storage.getUrl(document.fileId)}
  }
})


// functions related to insert into convex db 
// function running on the backend
export const createDocument = mutation({
  args: {
    title: v.string(),
    fileId: v.id("_storage")
  },
  async handler(ctx, args) {

    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
    console.log(userId)

    if(!userId) {
      throw new ConvexError('Not authenticated')
    }
    // add the data in convex database
    // the document with a title and the userId associated with the user
    await ctx.db.insert('documents', {
      title: args.title,
      tokenIdentifier: userId,
      fileId: args.fileId
    })
  }
})

// we use actions to contact a third-party library 
export const askQuestion = action({
  args: {
    question: v.string(),
    documentId: v.id("documents")
  },

  async handler(ctx, args) {

    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
      if(!userId) {
        throw new ConvexError('Not authenticated')
      }

      //get the document
      const document = await ctx.runQuery(api.documents.getDocument, {
        documentId: args.documentId
      })

      if(!document) {
        throw new ConvexError("Document not found")
      }
   
      const file = await ctx.storage.get(document.fileId)

      if(!file) {
        throw new ConvexError("File not found")
      }
  
      // uploaded file
      const text = await file.text()
      // user's question
      const question = args.question
    
      const chatCompletion: OpenAI.Chat.Completions.ChatCompletion = 
      await openai.chat.completions.create({
         messages: [
          { 
            role: 'system', 
            content: `Here is a text file: ${text}`
          },
          {
            role: 'user',
            content: `please answer this question ${args.question}`
          }
        ],
        model: 'gpt-3.5-turbo',
      });
      

        const response = chatCompletion.choices[0].message.content ?? 'could not generate a response'
        console.log(response)
        // return { response, question}

      // TODO: store user prompt as a chat record
        await ctx.runMutation(internal.chats.createChatRecord, {
          documentId: args.documentId,
          text: question,
          isHuman: true,
          tokenIdentifier: userId
        })

      //  store the AI response as a chat record
         await ctx.runMutation(internal.chats.createChatRecord, {
          documentId: args.documentId,
          text: response, 
          isHuman: false,
          tokenIdentifier: userId
        })

        return response
     
    },
  })

    
  


  