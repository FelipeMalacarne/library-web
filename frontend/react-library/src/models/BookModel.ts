class BookModel {
    id: number;
    title: string;
    author?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: number;
    img?: string;

    constructor(id: number, title: string, author: string, copies: number, copiesAvailable: number, img: string){
        this.id = id;
        this.title = title;
        this.author = author;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.category = this.category;
        this.img = img;
    }
}

export default BookModel;