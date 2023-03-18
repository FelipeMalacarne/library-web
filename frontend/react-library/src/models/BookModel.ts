class BookModel {
    idBook: number;
    title: string;
    author?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: number;
    img?: string;

    constructor(idBook: number, title: string, author: string, copies: number, copiesAvailable: number, img: string){
        this.idBook = idBook;
        this.title = title;
        this.author = author;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.category = this.category;
        this.img = img;
    }
}

export default BookModel;