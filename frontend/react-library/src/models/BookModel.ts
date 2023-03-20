class BookModel {
    id: number;
    title: string;
    author?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    description?: string;
    img?: string;

    constructor(id: number, title: string, author: string, copies: number, copiesAvailable: number, category: string, description: string, img: string){
        this.id = id;
        this.title = title;
        this.author = author;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.category = category;
        this.description = description;
        this.img = img;
    }
}


export default BookModel;