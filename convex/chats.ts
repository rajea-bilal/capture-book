import { internalMutation, query } from './_generated/server'
import { v } from "convex/values"


export const getChatsForDocument = query({
  args: {
    documentId: v.id('documents')
  },
  async handler(ctx, args) {
    
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
    if(!userId) {
      return []
    }
    
    // query the table where every record where that token identifier matches the userId
      return await ctx.db
            .query('chats')
            .withIndex('by_documentId_tokenIdentifier', (query) => 
            query.eq('documentId', args.documentId))
            .collect()
    }
  })

// internalMutations are private, they cant be called from a UI
export const createChatRecord = internalMutation({
  args: {
    documentId: v.id('documents'),
    text: v.string(),
    tokenIdentifier: v.string(),
    isHuman: v.boolean()
  }, 
  async handler (ctx, args) {
    await ctx.db.insert("chats", { 
      documentId: args.documentId, 
      text: args.text, 
      isHuman: args.isHuman,
      tokenIdentifier: args.tokenIdentifier
    })

  }
})
