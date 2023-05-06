declare module "iron-session" {
    interface IronSessionData {
      user?: {
        id: number;
      } | null;
    }
    interface IronSession extends IronSessionData{
        destroy:Function,
        save:Function
    }
  }
  