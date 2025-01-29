import {authResolvers} from './resolver.js'
import { authTypeDefs } from './schema.js';

export default {
    typeDefs: authTypeDefs,
    resolvers: authResolvers,
};
