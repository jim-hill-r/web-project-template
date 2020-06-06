import { importSchema } from 'graphql-import'

export class SchemaBuilder
{
  Build() : string { 
    return importSchema('./schema/schema.graphql')
  }
};