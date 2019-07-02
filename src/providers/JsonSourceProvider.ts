import data from "../sources.json";

export class JsonSourceProvider {
    getCategories() {
        return data.categories.map(c => { 
            return { name: c.name, image: c.backgroundImage};
        });
    }

    getImages(category) {
        const categoryData = data.categories.filter(c => c.name === category);
        if(categoryData.length === 1) {
            return categoryData[0].coloringPages;
        }
    }
}

export default new JsonSourceProvider();