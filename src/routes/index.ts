import {RanksRoutes} from "./instruments.route";

export function assignRoutes(app) {
    app.use("/instruments", RanksRoutes);
}
