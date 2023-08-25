import {defineConfig} from "umi";

export default defineConfig({
    routes: [
        {path: "/", component: "index"},
        {path: "/:id", component: "chat"},
        {path: '/*', component: 'index'},
    ],
    npmClient: 'pnpm',
});
