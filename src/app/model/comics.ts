
export interface Comic {
    id: string;
    name: string;
    image: string;
}

export const comics: Comic[] = [
    { id: '1', name: 'BATMAN: Damned', image: 'https://www.dccomics.com/sites/default/files/styles/comic_reader_cta/public/comic-covers/2018/09/BMDAM_01_300-001_HD_5b919b66648829.90302280.jpg?itok=ly9XuCUj'},
    { id: '2', name: 'BATMAN: Hush', image: 'https://www.dccomics.com/sites/default/files/styles/covers192x291/public/book-covers/2480_400x600.jpg?itok=9HFZMzjo'},
    { id: '3', name: 'BATMAN: The Long Helloween', image: 'https://www.dccomics.com/sites/default/files/styles/comics320x485/public/book-covers/1283_900x1350.jpg?itok=7h8Pif2v'}
];
