import PocketBase from "pocketbase";

const isBrowser = typeof window !== "undefined";

class PerTabAuthStore {
  token = "";
  model: any = null;
  isValid = false;

  save(token: string, model: any) {
    this.token = token;
    this.model = model;
    this.isValid = !!token;
    if (isBrowser) {
      sessionStorage.setItem("pb_auth", JSON.stringify({ token, model }));
    }
  }

  clear() {
    this.token = "";
    this.model = null;
    this.isValid = false;
    if (isBrowser) {
      sessionStorage.removeItem("pb_auth");
    }
  }

  load() {
    if (isBrowser) {
      const data = sessionStorage.getItem("pb_auth");
      if (data) {
        const { token, model } = JSON.parse(data);
        this.token = token;
        this.model = model;
        this.isValid = !!token;
      }
    }
  }
}

// Setup PocketBase
const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL!);

// Replace the default authStore
const perTabAuthStore = new PerTabAuthStore();
if (isBrowser) {
  perTabAuthStore.load(); // Only load from sessionStorage if on the client
  pb.authStore = perTabAuthStore as any;
}

export { pb };
