export  class Error
{
    public  ErrorId? : string; 
    public  ErrorMsg? : string; 
}

export  class DBReturn extends Error
{
    public  result: any;

    public Code ?: number;

    public  status?: string;

}