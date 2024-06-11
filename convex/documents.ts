import { mutation, query } from './_generated/server'
import { ConvexError, v } from "convex/values"


// to have displayed back from the database
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

// functions related to insert into convex db 
// function running on the backend
export const createDocument = mutation({
  args: {
    title: v.string(),
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
      tokenIdentifier: userId
    })
  }
})