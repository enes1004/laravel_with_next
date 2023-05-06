declare module "iron-session" {
    interface IronSessionData {
      auth?:Array<String>,
      user?: {
        id: number;
      } | null;
    }
    interface IronSession extends IronSessionData{
        destroy:Function,
        save:Function
    }
  }
  