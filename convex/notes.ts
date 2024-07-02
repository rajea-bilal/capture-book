import { internalMutation, mutation, query } from './_generated/server'
import { ConvexError, v } from "convex/values"


// internalMutations are private, they cant be called from a UI
export const createNote= mutation({
   args: {
    text: v.string(),
  },
  async handler(ctx, args) {

    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
    console.log(userId)

    if(!userId) {
      throw new ConvexError('Not authenticated')
    }
  
    //The insert method returns a globally unique ID for the newly inserted document.
    const note = await ctx.db.insert('notes', {
      text: args.text,
      tokenIdentifier: userId,
    })

    return note
  }
})


// to have docs displayed back from the database
export const getNotes = query({
  async handler(ctx) {

    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
    console.log(userId)
    
    if(!userId) {
      return undefined
    }
  // query the table where every record where that token identifier matches the userId
    const notes = await ctx.db
    .query('notes')
    .withIndex('by_tokenIdentifier', 
    (query) => query.eq('tokenIdentifier', userId))
    .order("desc")
    .collect()
  

    return notes
  }
  
})

// retrieve single note from the db
export const getNote = query({
  args: {
    noteId: v.id('notes')
  },

  // verify that user is logged in
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
    console.log(userId)

    
    if(!userId) {
      return null
    }

    const note = await ctx.db.get(args.noteId)

    if(!note) {
      return null
    }

    if(note.tokenIdentifier !== userId) {
      return null
    }

  // query the table where every record where that token identifier matches the userId
    return {...note}
  }
})
