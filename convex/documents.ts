import { mutation, query } from './_generated/server'
import { ConvexError, v } from "convex/values"

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