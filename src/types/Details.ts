export interface IAlbum{
    cover: string
    cover_big: string
    cover_medium: string
    cover_small: string
    cover_xl: string
    id: number
    md5_image: string
    releaseDate?: string
    title: string
    tracklist: string
    type: string
}

export interface IArtist{
    id: number
    link: string
    name: string
    picture: string
    picture_big: string
    picture_medium: string
    picture_small: string
    picture_xl: string
    tracklist: string
    type: string
    radio?: boolean
    share?:string
}