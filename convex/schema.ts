import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


// We are setting up a database schema that includes a table called documents.
// Each document has a title, a token identifier, and a file ID.
// We create an index to help quickly search documents by their token identifier.
export default defineSchema({
  // documents is the main table of the schema
  documents: defineTable({ 
    // defineTable function defines what the table will look like
    // the table will have two columns as listed below
    title: v.string(),
    tokenIdentifier: v.string(),
    description: v.optional(v.string()),
    fileId: v.id("_storage"),
  }).index('by_tokenIdentifier', ['tokenIdentifier']),

  chats: defineTable({ 
    // defineTable function defines what the table will look like
    // the table will have two columns as listed below
    documentId: v.id('documents'),
    tokenIdentifier: v.string(),
    text: v.string(),
    isHuman: v.boolean()
  }).index('by_documentId_tokenIdentifier', ['documentId', 'tokenIdentifier'])
});

//line: 12 creates an index on the 'tokenIdentifier' column. An index
// helps you quickly look up rows in the table based on the tokenIdentifier