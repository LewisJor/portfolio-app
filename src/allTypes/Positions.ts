import { objectType } from "@nexus/schema";

export const Position = objectType({
  name: "Position",
  definition(t) {
    t.id("id");
    t.string("title");
    t.string("company");
    t.string("startDate", {resolve: (position) => new Date(position.startDate)});
    t.string("endDate", {
      nullable: true,
      resolve: (position) =>
        position.endDate ? new Date(position.endDate) : null,
    });
  },
});
