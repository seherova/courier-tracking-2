export class CommandInvoker{
    static executeCommand(command: Command){
        try{
            return command.execute();
        }catch(e: any){
            return e;
        }
    }
}