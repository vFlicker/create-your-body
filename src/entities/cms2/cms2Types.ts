// Product types
export type Cms2Product = {
  id: number;
  title: string;
  slug: string;
  subscription: Cms2Subscription;
};

export type Cms2Subscription = {
  id: number;
  plan: 'Pro' | 'Base';
  stream: number;
  status: 'active' | 'pre' | 'expired';
  expiresAt: string;
  wasFirstSubscription?: boolean;
};

// Content node types
export type Cms2NodeType = 'folder' | 'lesson';

export type Cms2Access = {
  hasAccess: boolean;
  isTeaser: boolean;
  reason?: string;
  teaserMessage?: string;
  availableFrom?: string;
};

export type Cms2ContentNode = {
  id: number;
  title: string;
  type: Cms2NodeType;
  order: number;
  parentId: number | null;
  access: Cms2Access;
  hasChildren?: boolean;
  coverImage?: string | null;
  isCompleted?: boolean;
  hasTypeBadge?: boolean;
  settings?: Cms2NodeSettings;
  children: Cms2ContentNode[];
};

export type Cms2NodeSettings = {
  showStepTitles?: boolean;
};

// Product content response
export type Cms2ProductContent = {
  product: {
    id: number;
    title: string;
    slug: string;
  };
  subscription: Cms2Subscription;
  content: Cms2ContentNode[];
};

// Folder response
export type Cms2FolderResponse = {
  folder: {
    id: number;
    title: string;
    type: 'folder';
    parentId: number | null;
    access: Cms2Access;
  };
  children: Cms2ContentNode[];
};

// Lesson content blocks
export type Cms2ContentBlocks = {
  version: string;
  pages: Cms2Page[];
};

export type Cms2Page = {
  id: string;
  title: string;
  blocks: Cms2Block[];
};

export type Cms2Block = {
  type: 'text';
  content: TipTapDoc;
};

// TipTap document types
export type TipTapDoc = {
  type: 'doc';
  content: TipTapNode[];
};

export type TipTapNode =
  | TipTapParagraph
  | TipTapVideoBlock
  | TipTapDividerBlock
  | TipTapPdfBlock
  | TipTapImageBlock
  | TipTapNutritionBlock
  | TipTapIngredientsBlock
  | TipTapCookingStepsBlock
  | TipTapOrderedList
  | TipTapBulletList
  | TipTapListItem
  | TipTapHardBreak;

export type TipTapParagraph = {
  type: 'paragraph';
  attrs: { textAlign: string | null };
  content?: TipTapTextContent[];
};

export type TipTapTextContent = {
  type: 'text';
  text: string;
  marks?: TipTapMark[];
};

export type TipTapMark = {
  type: 'bold' | 'italic' | 'link';
  attrs?: { href?: string };
};

export type TipTapVideoBlock = {
  type: 'videoBlock';
  attrs: {
    src: string;
    platform: 'kinescope' | 'youtube';
    isVertical?: boolean;
  };
};

export type TipTapDividerBlock = {
  type: 'dividerBlock';
  attrs: {
    spacing: 'small' | 'medium' | 'large';
    showLine: boolean;
    lineStyle: 'solid' | 'dashed';
  };
};

export type TipTapPdfBlock = {
  type: 'pdfBlock';
  attrs: {
    url: string;
    size: number;
    filename: string;
  };
};

export type TipTapImageBlock = {
  type: 'imageBlock';
  attrs: {
    src: string;
    alt: string;
    width: 'full' | 'medium' | 'small';
  };
};

export type TipTapNutritionBlock = {
  type: 'nutritionBlock';
  attrs: {
    total: {
      fats: number;
      carbs: number;
      weight: number;
      protein: number;
      calories: number;
    };
    per100g: {
      fats: number;
      carbs: number;
      protein: number;
      calories: number;
    };
  };
};

export type TipTapIngredientsBlock = {
  type: 'ingredientsBlock';
  attrs: {
    ingredients: {
      id: string;
      name: string;
      amount: string;
    }[];
  };
};

export type TipTapCookingStepsBlock = {
  type: 'cookingStepsBlock';
  attrs: {
    steps: {
      id: string;
      text: string;
    }[];
  };
};

export type TipTapOrderedList = {
  type: 'orderedList';
  content: TipTapListItem[];
};

export type TipTapBulletList = {
  type: 'bulletList';
  content: TipTapListItem[];
};

export type TipTapListItem = {
  type: 'listItem';
  content: TipTapParagraph[];
};

export type TipTapHardBreak = {
  type: 'hardBreak';
};

// Lesson response
export type Cms2LessonResponse = {
  id: number;
  title: string;
  type: 'lesson';
  contentBlocks: Cms2ContentBlocks;
  access: Cms2Access;
  settings?: Cms2NodeSettings;
};

// Progress types
export type Cms2Progress = {
  nodeId: number;
  userId: number;
  isCompleted: boolean;
  progressData: {
    completedPages: string[];
    inputs: Record<string, unknown>;
  };
  updatedAt: string;
};

export type Cms2ProgressResponse = {
  success: boolean;
  data: Cms2Progress;
};

export type Cms2UpdateProgressDto = {
  pageId: string;
  isCompleted?: boolean;
  inputData?: {
    blockId: string;
    value: unknown;
  };
};

// API response wrappers
export type Cms2ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type Cms2ProductsResponse = Cms2ApiResponse<{
  products: Cms2Product[];
}>;

export type Cms2ProductContentResponse = Cms2ApiResponse<Cms2ProductContent>;
export type Cms2FolderApiResponse = Cms2ApiResponse<Cms2FolderResponse>;
export type Cms2LessonApiResponse = Cms2ApiResponse<Cms2LessonResponse>;

// Breadcrumbs
export type Cms2BreadcrumbItem = {
  id: number;
  title: string;
  slug?: string;
  type: 'product' | 'folder' | 'lesson';
};

export type Cms2BreadcrumbsResponse = Cms2ApiResponse<{
  breadcrumbs: Cms2BreadcrumbItem[];
}>;
