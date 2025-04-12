import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
export function parseAst(code){
    const ast = parse(code,{
        sourceType:'module',
        plugins:['typescript','classProperties','classPrivateMethods']
    })
    const tocItems = [];
    traverse(ast,{
        FunctionDeclaration(path){
            const name = path.node.id.name || 'anonymous';
            tocItems.push({type:'function',name});
        },
        ClassDeclaration(path){
            const name = path.node.id.name || 'Unnamedclass';
            const classNode = {type:'class',name,children:[]}

            path.traverse({
                ClassMethod(classPath){
                    const methodName = classPath.node.key.name || 'anonymous'
                    classNode.children.push({type:'method',name:methodName});
                }
            })
            tocItems.push(classNode);
        }
    })
    return tocItems;
}