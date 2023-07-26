
interface SingleSubjectOfBusinessWithImg {
    image: string;
    title: string;
    items: Array<{ id: number; title: string; price: number; description: string; category_id: number }>;
  }