export class IAuthor{
    constructor(
     public authorId: number,
     public authorName: string,
     public book: string,
     public genre: string,
     public country: string,
     public price:number,
     public starRating: number,
     public imageUrl: string){}
 }
 