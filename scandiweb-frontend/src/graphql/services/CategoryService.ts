import { fetchGraphQL } from "../client";

import { CategoryType } from "../../types";

export class CategoryService {
    static async allCategories() {
        const query = `
            query Categories {
                 categories {
                    id
                    name
                }
            }
        `;
        return fetchGraphQL<{categories: CategoryType[]}>(query);
    }
}
