interface Command{
    execute(): Promise<void>;
}