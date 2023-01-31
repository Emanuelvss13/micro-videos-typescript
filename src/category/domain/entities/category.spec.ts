import { omit } from "lodash";
import { UniqueEntityId } from "../../../@seedwork/domain/unique-entity-id.vo";
import { Category } from "./category";

describe("Category Tests", () => {
  test("Constructor of category", () => {
    let category = new Category({ name: "Movie" });

    let props = omit(category.props, "created_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });

    expect(category.created_at).toBeInstanceOf(Date);
  });

  test("id field", () => {
    type CategoryData = { props: { name: string; id?: any } };

    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie", id: null } },
      { props: { name: "Movie", id: undefined } },
      { props: { name: "Movie", id: new UniqueEntityId() } },
    ];

    data.forEach((i) => {
      let category = new Category(i.props);

      expect(category.id).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  it("getter and setter of name", () => {
    const category = new Category({ name: "Movie" });

    expect(category.name).toBe("Movie");

    category["name"] = "other name";

    expect(category.name).toBe("other name");
  });

  it("getter and setter of description", () => {
    let category = new Category({ name: "Movie" });

    expect(category.description).toBe(null);

    category = new Category({
      name: "Movie",
      description: "some description",
    });

    expect(category.description).toBe("some description");

    category = new Category({ name: "Movie" });

    category["description"] = "other description";

    expect(category.description).toBe("other description");

    category["description"] = null;

    expect(category.description).toBe(null);

    category["description"] = undefined;

    expect(category.description).toBe(null);

    category = new Category({
      name: "Movie",
      description: "some description",
    });

    category["description"] = "other description";

    expect(category.description).toBe("other description");
  });

  it("should update category", () => {
    const category = new Category({
      name: "Movie",
      description: "Description",
    });

    category.update("Documentary", "Other description");

    expect(category.name).toBe("Documentary");
    expect(category.description).toBe("Other description");
  });

  it("should activate category", () => {
    const category = new Category({ name: "Movie", is_active: false });

    category.activate();

    expect(category.is_active).toBeTruthy();
  });

  it("should deactivate category", () => {
    const category = new Category({ name: "Movie" });

    category.deactivate();

    expect(category.is_active).not.toBeTruthy();
  });
});
