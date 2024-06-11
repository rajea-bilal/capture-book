import { mutation, query } from './_generated/server'
import { v } from "convex/values"


// to have displayed back from the database
export const getDocuments = query({
  async handler(ctx) {
    return await ctx.db.query('documents').collect()
  }
})

// functions related to insert into convex db 
// function running on the backend
export const createDocument = mutation({
  args: {
    title: v.string(),
  },
  async handler(ctx, args) {
    // add the data in convex database
    await ctx.db.insert('documents', {
      title: args.title
    })
  }
})