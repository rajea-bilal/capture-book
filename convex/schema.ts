import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // documents is the main table of the schema
  documents: defineTable({ 
    // defineTable function defines what the table will look like
    // the table will have two columns as listed below
    title: v.string(),
    tokenIdentifier: v.string()
  }).index('by_tokenIdentifier', ['tokenIdentifier'])
});

//line: 12 creates an index on the 'tokenIdentifier' column. An index
// helps you quickly look up rows in the table based on the tokenIdentifier