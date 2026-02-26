// 레시피 상세 페이지 타입 정의
export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface CookingStep {
  title: string;
  description: string;
  tips: string;
}

export interface RecipeDetail {
  id: number;
  code: string;
  name: string;
  description: string;
  servings: string;
  cookingTime: string;
  difficulty: '쉬움' | '보통' | '어려움';
  
  ingredients: {
    categories: Record<string, Ingredient[]>;
    total: number;
  };
  
  nutrition: Record<string, string>;
  
  steps: CookingStep[];
  
  tags: string[];
  
  images: {
    hero: string;
    steps: string[];
  };
  
  author: {
    name: string;
    avatar: string;
  };
  
  stats: {
    likes: number;
    saves: number;
    reviews: number;
  };
}

export const recipesDetail: RecipeDetail[] = [
  {
    "id": 2,
    "code": "PV02",
    "name": "로스티드 비트 카르파초",
    "description": "프랑스 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "채소류": [
          {
            "name": "비트",
            "amount": "300",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "발사믹 글레이즈",
            "amount": "30",
            "unit": "ml"
          },
          {
            "name": "아루굴라",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "엑스트라 버진 올리브 오일",
            "amount": "20",
            "unit": "ml"
          }
        ],
        "단백질": [
          {
            "name": "캐슈넛 리코타",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "호두",
            "amount": "30",
            "unit": "g"
          }
        ]
      },
      "total": 6
    },
    "nutrition": {
      "칼로리": "351kcal",
      "탄수화물": "69g",
      "단백질": "29g",
      "지방": "14g",
      "나트륨": "589mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "비트를 호일에 싸서 180도 오븐에서 1시간 30분간 굽는다. 식힌 후 껍질을 벗기고 얇게 슬라이스한다. 접시에 비트를 원형으로 펼쳐 담고 캐슈넛 리코타를 곳곳에 올린다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "아루굴라와 호두를 뿌리고 발사믹 글레이즈를 지그재그로 뿌린다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "프랑스"
    ],
    "images": {
      "hero": "/images/recipes/PV02_hero.jpg",
      "steps": [
        "/images/recipes/PV02_step1.jpg",
        "/images/recipes/PV02_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 134,
      "saves": 76,
      "reviews": 24
    }
  },
  {
    "id": 3,
    "code": "PV10",
    "name": "렌틸 볼로네제",
    "description": "이탈리아 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "단백질": [
          {
            "name": "갈색 렌틸",
            "amount": "200",
            "unit": "g"
          }
        ],
        "채소류": [
          {
            "name": "토마토 소스",
            "amount": "300",
            "unit": "ml"
          },
          {
            "name": "당근",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "양파",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "마늘",
            "amount": "3",
            "unit": "쪽"
          }
        ],
        "기타": [
          {
            "name": "셀러리",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "레드 와인",
            "amount": "50",
            "unit": "ml"
          },
          {
            "name": "오레가노",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "바질",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "곡물": [
          {
            "name": "펜네면",
            "amount": "100",
            "unit": "g"
          }
        ]
      },
      "total": 10
    },
    "nutrition": {
      "칼로리": "389kcal",
      "탄수화물": "69g",
      "단백질": "28g",
      "지방": "11g",
      "나트륨": "960mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "렌틸을 30분간 삶아 건진다. 당근, 셀러리, 양파, 마늘을 잘게 다진다. 올리브 오일에 채소를 10분간 볶고 레드 와인을 넣어 알코올을 날린다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "토마토 소스와 렌틸을 넣고 30분간 약불에서 끓인다. 오레가노, 바질로 간한다. 10분 익힌 면에 소스를 부어준다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "이탈리아"
    ],
    "images": {
      "hero": "/images/recipes/PV10_hero.jpg",
      "steps": [
        "/images/recipes/PV10_step1.jpg",
        "/images/recipes/PV10_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 151,
      "saves": 89,
      "reviews": 31
    }
  },
  {
    "id": 4,
    "code": "PV33",
    "name": "해바라기씨 페스토 파스타",
    "description": "이탈리아 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "채소류": [
          {
            "name": "파스타",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "마늘",
            "amount": "2",
            "unit": "쪽"
          },
          {
            "name": "방울토마토",
            "amount": "150",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "해바라기씨",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "바질",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "레몬즙",
            "amount": "20",
            "unit": "ml"
          },
          {
            "name": "영양효모",
            "amount": "20",
            "unit": "g"
          },
          {
            "name": "올리브 오일",
            "amount": "50",
            "unit": "ml"
          },
          {
            "name": "루꼴라",
            "amount": "50",
            "unit": "g"
          }
        ]
      },
      "total": 9
    },
    "nutrition": {
      "칼로리": "541kcal",
      "탄수화물": "59g",
      "단백질": "15g",
      "지방": "12g",
      "나트륨": "905mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "해바라기씨를 마른 팬에 살짝 볶는다. 바질, 해바라기씨, 마늘, 레몬즙, 영양효모, 소금을 푸드프로세서에 넣고 올리브 오일을 넣으며 간다. 파스타를 삶아 건지고 면수 약간과 함께 페스토에 버무린다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "방울토마토를 반으로 잘라 올리고 루꼴라를 곁들인다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "이탈리아"
    ],
    "images": {
      "hero": "/images/recipes/PV33_hero.jpg",
      "steps": [
        "/images/recipes/PV33_step1.jpg",
        "/images/recipes/PV33_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 168,
      "saves": 102,
      "reviews": 38
    }
  },
  {
    "id": 5,
    "code": "PV34",
    "name": "케일 월도프 샐러드",
    "description": "한국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "채소류": [
          {
            "name": "케일",
            "amount": "200",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "사과",
            "amount": "1",
            "unit": "개"
          },
          {
            "name": "셀러리",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "건크랜베리",
            "amount": "30",
            "unit": "g"
          },
          {
            "name": "비건 마요네즈",
            "amount": "60",
            "unit": "ml"
          },
          {
            "name": "레몬즙",
            "amount": "20",
            "unit": "ml"
          },
          {
            "name": "디종 머스타드",
            "amount": "10",
            "unit": "g"
          }
        ],
        "단백질": [
          {
            "name": "호두",
            "amount": "50",
            "unit": "g"
          }
        ]
      },
      "total": 8
    },
    "nutrition": {
      "칼로리": "444kcal",
      "탄수화물": "75g",
      "단백질": "22g",
      "지방": "18g",
      "나트륨": "687mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "케일을 잘게 찢어 올리브 오일과 소금을 넣고 손으로 마사지하듯 주무른다. 사과와 셀러리를 얇게 슬라이스한다. 비건 마요네즈, 레몬즙, 머스타드를 섞어 드레싱을 만든다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "케일, 사과, 셀러리, 건크랜베리를 볼에 넣고 드레싱으로 버무린다. 호두를 뿌려 완성한다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "한국"
    ],
    "images": {
      "hero": "/images/recipes/PV34_hero.jpg",
      "steps": [
        "/images/recipes/PV34_step1.jpg",
        "/images/recipes/PV34_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 185,
      "saves": 115,
      "reviews": 45
    }
  },
  {
    "id": 6,
    "code": "PV17",
    "name": "지중해식 퀴노아 샐러드",
    "description": "그리스 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "곡물": [
          {
            "name": "퀴노아",
            "amount": "150",
            "unit": "g"
          }
        ],
        "채소류": [
          {
            "name": "오이",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "방울토마토",
            "amount": "150",
            "unit": "g"
          },
          {
            "name": "적양파",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "파슬리",
            "amount": "20",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "올리브",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "민트",
            "amount": "10",
            "unit": "g"
          },
          {
            "name": "레몬즙",
            "amount": "40",
            "unit": "ml"
          },
          {
            "name": "올리브 오일",
            "amount": "30",
            "unit": "ml"
          }
        ]
      },
      "total": 9
    },
    "nutrition": {
      "칼로리": "422kcal",
      "탄수화물": "68g",
      "단백질": "28g",
      "지방": "12g",
      "나트륨": "673mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "퀴노아를 씻어 물 300ml에 15분간 삶고 식힌다. 오이, 방울토마토, 적양파를 깍둑썬다. 올리브는 슬라이스하고 허브는 잘게 다진다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "모든 재료를 볼에 넣고 레몬즙, 올리브 오일, 소금, 후추로 드레싱해 섞는다. 냉장고에서 30분간 숙성시켜 서빙한다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "그리스"
    ],
    "images": {
      "hero": "/images/recipes/PV17_hero.jpg",
      "steps": [
        "/images/recipes/PV17_step1.jpg",
        "/images/recipes/PV17_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 202,
      "saves": 128,
      "reviews": 52
    }
  },
  {
    "id": 7,
    "code": "PV23",
    "name": "아시안 피넛 누들",
    "description": "태국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "곡물": [
          {
            "name": "쌀국수",
            "amount": "200",
            "unit": "g"
          }
        ],
        "단백질": [
          {
            "name": "두부",
            "amount": "150",
            "unit": "g"
          }
        ],
        "채소류": [
          {
            "name": "당근",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "대파",
            "amount": "30",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "빨간 양배추",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "땅콩",
            "amount": "30",
            "unit": "g"
          },
          {
            "name": "땅콩버터",
            "amount": "40",
            "unit": "g"
          },
          {
            "name": "간장",
            "amount": "30",
            "unit": "ml"
          },
          {
            "name": "라임즙",
            "amount": "20",
            "unit": "ml"
          },
          {
            "name": "스리라차",
            "amount": "10",
            "unit": "ml"
          },
          {
            "name": "메이플 시럽",
            "amount": "15",
            "unit": "ml"
          }
        ]
      },
      "total": 11
    },
    "nutrition": {
      "칼로리": "379kcal",
      "탄수화물": "55g",
      "단백질": "20g",
      "지방": "19g",
      "나트륨": "517mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "두부를 깍둑썰어 에어프라이어나 팬에 바삭하게 굽는다. 쌀국수를 끓는 물에 4분간 삶아 찬물에 헹군다. 당근과 양배추를 채썬다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "땅콩버터, 간장, 라임즙, 스리라차, 메이플 시럽, 다진 마늘을 섞어 소스를 만든다. 면, 채소, 두부를 볼에 넣고 소스를 뿌려 버무린다. 대파와 땅콩을 뿌린다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "태국"
    ],
    "images": {
      "hero": "/images/recipes/PV23_hero.jpg",
      "steps": [
        "/images/recipes/PV23_step1.jpg",
        "/images/recipes/PV23_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 219,
      "saves": 141,
      "reviews": 59
    }
  },
  {
    "id": 8,
    "code": "PV31",
    "name": "크리스피 두부 스테이크",
    "description": "한국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "단백질": [
          {
            "name": "단단한 두부",
            "amount": "400",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "간장",
            "amount": "40",
            "unit": "ml"
          },
          {
            "name": "메이플 시럽",
            "amount": "20",
            "unit": "ml"
          },
          {
            "name": "참기름",
            "amount": "15",
            "unit": "ml"
          },
          {
            "name": "전분",
            "amount": "30",
            "unit": "g"
          },
          {
            "name": "청경채",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "참깨",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "마늘",
            "amount": "3",
            "unit": "쪽"
          },
          {
            "name": "생강",
            "amount": "15",
            "unit": "g"
          },
          {
            "name": "대파",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 10
    },
    "nutrition": {
      "칼로리": "435kcal",
      "탄수화물": "78g",
      "단백질": "25g",
      "지방": "10g",
      "나트륨": "715mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "두부를 눌러 물기를 빼고 1. 5cm 두께로 자른다. 간장, 메이플 시럽, 다진 마늘, 생강, 참기름을 섞어 소스를 만든다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "두부에 전분을 입히고 팬에 올리브 오일을 두르고 양면을 바삭하게 굽는다. 청경채를 데친다. 두부에 소스를 끼얹고 청경채를 곁들인다.",
        "tips": ""
      },
      {
        "title": "3단계",
        "description": "대파와 참깨로 마무리한다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "한국"
    ],
    "images": {
      "hero": "/images/recipes/PV31_hero.jpg",
      "steps": [
        "/images/recipes/PV31_step1.jpg",
        "/images/recipes/PV31_step2.jpg",
        "/images/recipes/PV31_step3.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 236,
      "saves": 154,
      "reviews": 16
    }
  },
  {
    "id": 9,
    "code": "PV37",
    "name": "구운 채소 라자냐",
    "description": "이탈리아 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "곡물": [
          {
            "name": "라자냐 면",
            "amount": "200",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "주키니",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "가지",
            "amount": "150",
            "unit": "g"
          },
          {
            "name": "바질",
            "amount": "20",
            "unit": "장"
          },
          {
            "name": "비건 모짜렐라",
            "amount": "150",
            "unit": "g"
          }
        ],
        "채소류": [
          {
            "name": "토마토 소스",
            "amount": "400",
            "unit": "ml"
          }
        ],
        "단백질": [
          {
            "name": "캐슈 베샤멜",
            "amount": "300",
            "unit": "ml"
          }
        ]
      },
      "total": 7
    },
    "nutrition": {
      "칼로리": "471kcal",
      "탄수화물": "60g",
      "단백질": "22g",
      "지방": "12g",
      "나트륨": "562mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "주키니와 가지를 얇게 슬라이스해 올리브 오일을 발라 그릴에 굽는다. 캐슈넛, 식물성 우유, 넛맥, 소금으로 베샤멜을 만든다. 베이킹 디쉬에 토마토 소스, 라자냐 면, 구운 채소, 바질, 베샤멜 순서로 3겹 쌓는다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "비건 모짜렐라를 올리고 180도에서 40분간 굽는다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "이탈리아"
    ],
    "images": {
      "hero": "/images/recipes/PV37_hero.jpg",
      "steps": [
        "/images/recipes/PV37_step1.jpg",
        "/images/recipes/PV37_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 253,
      "saves": 167,
      "reviews": 23
    }
  },
  {
    "id": 19,
    "code": "No.",
    "name": "메뉴명",
    "description": "출처국가 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "주재료",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 1
    },
    "nutrition": {
      "칼로리": "452kcal",
      "탄수화물": "74g",
      "단백질": "15g",
      "지방": "13g",
      "나트륨": "743mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "조리방법.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "출처국가"
    ],
    "images": {
      "hero": "/images/recipes/No._hero.jpg",
      "steps": [
        "/images/recipes/No._step1.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 423,
      "saves": 97,
      "reviews": 43
    }
  },
  {
    "id": 20,
    "code": "PP02",
    "name": "홋카이도 관자 버터 소테",
    "description": "일본 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "홋카이도 관자",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "무염 버터",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "타임",
            "amount": "5",
            "unit": "g"
          },
          {
            "name": "레몬즙",
            "amount": "15",
            "unit": "ml"
          },
          {
            "name": "케이퍼",
            "amount": "20",
            "unit": "g"
          },
          {
            "name": "완두콩 퓨레",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "마이크로 그린",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "마늘",
            "amount": "2",
            "unit": "쪽"
          }
        ]
      },
      "total": 8
    },
    "nutrition": {
      "칼로리": "498kcal",
      "탄수화물": "75g",
      "단백질": "27g",
      "지방": "11g",
      "나트륨": "548mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "관자의 물기를 완전히 제거하고 소금, 후추로 간한다. 팬을 아주 뜨겁게 달구고 올리브 오일을 두른다. 관자를 넣고 2분간 손대지 않고 굽는다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "뒤집어 1분 30초 더 굽고 버터, 마늘, 타임을 넣어 버터를 끼얹어가며 마무리한다. 완두콩 퓨레를 접시에 깔고 관자를 올린다.",
        "tips": ""
      }
    ],
    "tags": [
      "페스코",
      "건강식",
      "일본"
    ],
    "images": {
      "hero": "/images/recipes/PP02_hero.jpg",
      "steps": [
        "/images/recipes/PP02_step1.jpg",
        "/images/recipes/PP02_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 440,
      "saves": 110,
      "reviews": 50
    }
  },
  {
    "id": 21,
    "code": "PP07",
    "name": "미소 글레이즈드 삼치",
    "description": "일본 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "삼치 필레",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "화이트 미소",
            "amount": "40",
            "unit": "g"
          },
          {
            "name": "미림",
            "amount": "30",
            "unit": "ml"
          },
          {
            "name": "사케",
            "amount": "30",
            "unit": "ml"
          },
          {
            "name": "설탕",
            "amount": "15",
            "unit": "g"
          },
          {
            "name": "시소 잎",
            "amount": "5",
            "unit": "장"
          },
          {
            "name": "무",
            "amount": "100",
            "unit": "g"
          }
        ],
        "채소류": [
          {
            "name": "생강 절임",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "대파",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 9
    },
    "nutrition": {
      "칼로리": "405kcal",
      "탄수화물": "57g",
      "단백질": "18g",
      "지방": "13g",
      "나트륨": "749mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "미소, 미림, 사케, 설탕을 섞어 미소 글레이즈를 만든다. 삼치에 글레이즈를 발라 냉장고에서 최소 4시간, 가능하면 하룻밤 재운다. 200도 오븐에서 12분간 굽거나 그릴에서 글레이즈가 캐러멜화될 때까지 굽는다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "무를 강판에 갈아 물기를 빼고 대파, 생강 절임, 시소 잎과 함께 곁들인다.",
        "tips": ""
      }
    ],
    "tags": [
      "페스코",
      "건강식",
      "일본"
    ],
    "images": {
      "hero": "/images/recipes/PP07_hero.jpg",
      "steps": [
        "/images/recipes/PP07_step1.jpg",
        "/images/recipes/PP07_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 457,
      "saves": 123,
      "reviews": 57
    }
  },
  {
    "id": 22,
    "code": "PP06",
    "name": "그릴드 옥토퍼스",
    "description": "그리스 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "문어 다리",
            "amount": "300",
            "unit": "g"
          },
          {
            "name": "올리브 오일",
            "amount": "40",
            "unit": "ml"
          },
          {
            "name": "레몬",
            "amount": "1",
            "unit": "개"
          },
          {
            "name": "오레가노",
            "amount": "5",
            "unit": "g"
          },
          {
            "name": "감자",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "아이올리",
            "amount": "50",
            "unit": "ml"
          }
        ],
        "채소류": [
          {
            "name": "파프리카",
            "amount": "3",
            "unit": "g"
          },
          {
            "name": "파슬리",
            "amount": "15",
            "unit": "g"
          },
          {
            "name": "마늘",
            "amount": "3",
            "unit": "쪽"
          }
        ]
      },
      "total": 9
    },
    "nutrition": {
      "칼로리": "491kcal",
      "탄수화물": "75g",
      "단백질": "17g",
      "지방": "10g",
      "나트륨": "956mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "문어를 큰 냄비에 넣고 40분간 삶아 부드럽게 만든다. 식힌 후 올리브 오일, 레몬즙, 파프리카, 오레가노, 다진 마늘로 마리네이드해 30분간 둔다. 감자를 삶아 으깨거나 슬라이스한다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "그릴 팬을 뜨겁게 달구고 문어를 올려 그릴 자국이 나도록 양면을 2분씩 굽는다. 감자 위에 문어를 올리고 아이올리, 파슬리로 마무리한다.",
        "tips": ""
      }
    ],
    "tags": [
      "페스코",
      "건강식",
      "그리스"
    ],
    "images": {
      "hero": "/images/recipes/PP06_hero.jpg",
      "steps": [
        "/images/recipes/PP06_step1.jpg",
        "/images/recipes/PP06_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 474,
      "saves": 136,
      "reviews": 14
    }
  },
  {
    "id": 23,
    "code": "PP13",
    "name": "레몬 허브 농어 구이",
    "description": "이탈리아 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "농어 필레",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "레몬",
            "amount": "1",
            "unit": "개"
          },
          {
            "name": "로즈마리",
            "amount": "10",
            "unit": "g"
          },
          {
            "name": "타임",
            "amount": "5",
            "unit": "g"
          },
          {
            "name": "케이퍼",
            "amount": "20",
            "unit": "g"
          },
          {
            "name": "화이트 와인",
            "amount": "50",
            "unit": "ml"
          },
          {
            "name": "버터",
            "amount": "30",
            "unit": "g"
          },
          {
            "name": "올리브 오일",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "마늘",
            "amount": "3",
            "unit": "쪽"
          }
        ]
      },
      "total": 9
    },
    "nutrition": {
      "칼로리": "543kcal",
      "탄수화물": "58g",
      "단백질": "25g",
      "지방": "12g",
      "나트륨": "877mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "농어에 소금, 후추로 간한다. 팬에 올리브 오일을 두르고 농어를 껍질 쪽부터 3분간 굽는다. 뒤집어 2분 더 굽고 마늘, 로즈마리, 타임을 넣는다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "버터를 넣어 녹이며 생선에 끼얹는다. 화이트 와인과 케이퍼를 넣어 소스를 만든다. 레몬 슬라이스를 올려 서빙한다.",
        "tips": ""
      }
    ],
    "tags": [
      "페스코",
      "건강식",
      "이탈리아"
    ],
    "images": {
      "hero": "/images/recipes/PP13_hero.jpg",
      "steps": [
        "/images/recipes/PP13_step1.jpg",
        "/images/recipes/PP13_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 491,
      "saves": 149,
      "reviews": 21
    }
  },
  {
    "id": 24,
    "code": "PP44",
    "name": "해물 짬뽕 리조또",
    "description": "한국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "곡물": [
          {
            "name": "아르보리오 쌀",
            "amount": "150",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "혼합 해물",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "고춧가루",
            "amount": "20",
            "unit": "g"
          },
          {
            "name": "굴소스",
            "amount": "15",
            "unit": "ml"
          },
          {
            "name": "해물 육수",
            "amount": "600",
            "unit": "ml"
          },
          {
            "name": "청경채",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "참기름",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "마늘",
            "amount": "3",
            "unit": "쪽"
          },
          {
            "name": "생강",
            "amount": "10",
            "unit": "g"
          },
          {
            "name": "대파",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 10
    },
    "nutrition": {
      "칼로리": "399kcal",
      "탄수화물": "67g",
      "단백질": "20g",
      "지방": "18g",
      "나트륨": "726mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "마늘, 생강을 올리브 오일에 볶고 고춧가루를 넣어 향을 낸다. 쌀을 넣어 코팅하고 육수를 한 국자씩 넣으며 저어가며 익힌다. 별도 팬에 해물을 살짝 볶는다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "청경채를 데친다. 쌀이 익으면 해물, 굴소스를 넣고 섞는다. 청경채, 대파, 참기름, 후추로 마무리한다.",
        "tips": ""
      }
    ],
    "tags": [
      "페스코",
      "건강식",
      "한국"
    ],
    "images": {
      "hero": "/images/recipes/PP44_hero.jpg",
      "steps": [
        "/images/recipes/PP44_step1.jpg",
        "/images/recipes/PP44_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 508,
      "saves": 162,
      "reviews": 28
    }
  },
  {
    "id": 25,
    "code": "PP29",
    "name": "피쉬 타코",
    "description": "멕시코 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "흰살 생선",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "콘 또띠아",
            "amount": "6",
            "unit": "장"
          },
          {
            "name": "양배추",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "아보카도",
            "amount": "1",
            "unit": "개"
          },
          {
            "name": "고수 크레마",
            "amount": "60",
            "unit": "ml"
          },
          {
            "name": "라임",
            "amount": "2",
            "unit": "개"
          },
          {
            "name": "치폴레 마요",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "고수",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "쿠민",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "적양파",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "파프리카",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 11
    },
    "nutrition": {
      "칼로리": "357kcal",
      "탄수화물": "66g",
      "단백질": "26g",
      "지방": "14g",
      "나트륨": "980mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "생선에 쿠민, 파프리카, 소금을 뿌려 팬에 굽거나 튀긴다. 양배추를 채 썰어 라임즙과 소금으로 버무린다. 사워크림에 고수, 라임즙을 섞어 크레마를 만든다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "또띠아를 마른 팬에 굽는다. 또띠아에 생선, 양배추, 아보카도, 크레마, 치폴레 마요를 올린다.",
        "tips": ""
      }
    ],
    "tags": [
      "페스코",
      "건강식",
      "멕시코"
    ],
    "images": {
      "hero": "/images/recipes/PP29_hero.jpg",
      "steps": [
        "/images/recipes/PP29_step1.jpg",
        "/images/recipes/PP29_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 525,
      "saves": 175,
      "reviews": 35
    }
  },
  {
    "id": 29,
    "code": "No.",
    "name": "메뉴명",
    "description": "출처국가 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "주재료",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 1
    },
    "nutrition": {
      "칼로리": "362kcal",
      "탄수화물": "52g",
      "단백질": "26g",
      "지방": "13g",
      "나트륨": "766mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "조리방법.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "출처국가"
    ],
    "images": {
      "hero": "/images/recipes/No._hero.jpg",
      "steps": [
        "/images/recipes/No._step1.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 593,
      "saves": 227,
      "reviews": 13
    }
  },
  {
    "id": 30,
    "code": "CV01",
    "name": "고추장 두부 덮밥",
    "description": "한국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "단백질": [
          {
            "name": "두부",
            "amount": "200",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "고추장",
            "amount": "40",
            "unit": "g"
          },
          {
            "name": "간장",
            "amount": "20",
            "unit": "ml"
          },
          {
            "name": "설탕",
            "amount": "15",
            "unit": "g"
          },
          {
            "name": "참기름",
            "amount": "10",
            "unit": "ml"
          },
          {
            "name": "밥",
            "amount": "250",
            "unit": "g"
          },
          {
            "name": "참깨",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "계란 프라이(비건 옵션)",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "마늘",
            "amount": "2",
            "unit": "쪽"
          },
          {
            "name": "양파",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "당근",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "대파",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 12
    },
    "nutrition": {
      "칼로리": "387kcal",
      "탄수화물": "70g",
      "단백질": "25g",
      "지방": "18g",
      "나트륨": "971mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "두부를 깍둑썰어 팬에 바삭하게 굽는다. 고추장, 간장, 설탕, 다진 마늘을 섞어 양념을 만든다. 양파, 당근을 볶다가 두부와 양념을 넣어 볶는다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "밥 위에 올리고 대파, 참깨를 뿌린다. 참기름을 둘러 마무리한다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "한국"
    ],
    "images": {
      "hero": "/images/recipes/CV01_hero.jpg",
      "steps": [
        "/images/recipes/CV01_step1.jpg",
        "/images/recipes/CV01_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 110,
      "saves": 240,
      "reviews": 20
    }
  },
  {
    "id": 31,
    "code": "CV04",
    "name": "지중해 후무스 랩",
    "description": "중동 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "또띠아",
            "amount": "2",
            "unit": "장"
          },
          {
            "name": "후무스",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "올리브",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "레몬즙",
            "amount": "15",
            "unit": "ml"
          }
        ],
        "채소류": [
          {
            "name": "오이",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "토마토",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "적양파",
            "amount": "30",
            "unit": "g"
          },
          {
            "name": "파슬리",
            "amount": "10",
            "unit": "g"
          }
        ]
      },
      "total": 8
    },
    "nutrition": {
      "칼로리": "534kcal",
      "탄수화물": "74g",
      "단백질": "18g",
      "지방": "13g",
      "나트륨": "919mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "오이, 토마토, 적양파를 슬라이스한다. 또띠아에 후무스를 넉넉히 바른다. 채소와 올리브를 올리고 레몬즙을 뿌린다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "파슬리를 뿌리고 단단히 말아 반으로 자른다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "중동"
    ],
    "images": {
      "hero": "/images/recipes/CV04_hero.jpg",
      "steps": [
        "/images/recipes/CV04_step1.jpg",
        "/images/recipes/CV04_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 127,
      "saves": 53,
      "reviews": 27
    }
  },
  {
    "id": 32,
    "code": "CV08",
    "name": "마라 두부 볶음",
    "description": "중국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "단백질": [
          {
            "name": "두부",
            "amount": "250",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "청경채",
            "amount": "150",
            "unit": "g"
          },
          {
            "name": "마라 소스",
            "amount": "40",
            "unit": "g"
          },
          {
            "name": "두반장",
            "amount": "20",
            "unit": "g"
          },
          {
            "name": "땅콩",
            "amount": "20",
            "unit": "g"
          },
          {
            "name": "밥",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "마늘",
            "amount": "3",
            "unit": "쪽"
          },
          {
            "name": "생강",
            "amount": "10",
            "unit": "g"
          },
          {
            "name": "대파",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 9
    },
    "nutrition": {
      "칼로리": "376kcal",
      "탄수화물": "75g",
      "단백질": "26g",
      "지방": "13g",
      "나트륨": "600mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "두부를 깍둑썰어 팬에 바삭하게 굽는다. 마늘, 생강을 볶고 마라 소스, 두반장을 넣어 향을 낸다. 청경채와 두부를 넣어 볶는다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "땅콩과 대파를 올려 밥과 함께 서빙한다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "중국"
    ],
    "images": {
      "hero": "/images/recipes/CV08_hero.jpg",
      "steps": [
        "/images/recipes/CV08_step1.jpg",
        "/images/recipes/CV08_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 144,
      "saves": 66,
      "reviews": 34
    }
  },
  {
    "id": 33,
    "code": "CV10",
    "name": "버섯 잡채",
    "description": "한국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "곡물": [
          {
            "name": "당면",
            "amount": "150",
            "unit": "g"
          }
        ],
        "채소류": [
          {
            "name": "표고버섯",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "시금치",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "당근",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "양파",
            "amount": "80",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "양송이",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "간장",
            "amount": "40",
            "unit": "ml"
          },
          {
            "name": "설탕",
            "amount": "15",
            "unit": "g"
          },
          {
            "name": "참기름",
            "amount": "15",
            "unit": "ml"
          },
          {
            "name": "참깨",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 10
    },
    "nutrition": {
      "칼로리": "440kcal",
      "탄수화물": "69g",
      "단백질": "21g",
      "지방": "15g",
      "나트륨": "727mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "당면을 삶아 건진다. 채소를 채 썬다. 각 채소를 따로 볶아 간장, 설탕으로 간한다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "당면과 채소를 함께 버무린다. 참기름과 참깨를 넣어 마무리한다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "한국"
    ],
    "images": {
      "hero": "/images/recipes/CV10_hero.jpg",
      "steps": [
        "/images/recipes/CV10_step1.jpg",
        "/images/recipes/CV10_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 161,
      "saves": 79,
      "reviews": 41
    }
  },
  {
    "id": 34,
    "code": "CV17",
    "name": "스파이시 콜리플라워 타코",
    "description": "멕시코 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "콜리플라워",
            "amount": "300",
            "unit": "g"
          },
          {
            "name": "쿠민",
            "amount": "3",
            "unit": "g"
          },
          {
            "name": "라임즙",
            "amount": "20",
            "unit": "ml"
          },
          {
            "name": "콘 또띠아",
            "amount": "4",
            "unit": "장"
          },
          {
            "name": "양배추",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "고수 크레마",
            "amount": "50",
            "unit": "ml"
          },
          {
            "name": "고수",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "훈제 파프리카",
            "amount": "5",
            "unit": "g"
          }
        ]
      },
      "total": 8
    },
    "nutrition": {
      "칼로리": "422kcal",
      "탄수화물": "52g",
      "단백질": "23g",
      "지방": "10g",
      "나트륨": "851mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "콜리플라워를 송이로 나눠 훈제 파프리카, 쿠민, 올리브 오일에 버무린다. 200도 오븐에서 20분간 굽는다. 양배추를 채 썬다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "또띠아에 양배추, 콜리플라워, 크레마, 고수를 올린다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "멕시코"
    ],
    "images": {
      "hero": "/images/recipes/CV17_hero.jpg",
      "steps": [
        "/images/recipes/CV17_step1.jpg",
        "/images/recipes/CV17_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 178,
      "saves": 92,
      "reviews": 48
    }
  },
  {
    "id": 35,
    "code": "CV23",
    "name": "지중해 채소 파스타",
    "description": "이탈리아 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "펜네",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "가지",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "주키니",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "올리브",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "케이퍼",
            "amount": "15",
            "unit": "g"
          },
          {
            "name": "바질",
            "amount": "10",
            "unit": "장"
          },
          {
            "name": "올리브 오일",
            "amount": "30",
            "unit": "ml"
          }
        ],
        "채소류": [
          {
            "name": "방울토마토",
            "amount": "150",
            "unit": "g"
          }
        ]
      },
      "total": 8
    },
    "nutrition": {
      "칼로리": "379kcal",
      "탄수화물": "76g",
      "단백질": "29g",
      "지방": "10g",
      "나트륨": "868mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "파스타를 삶는다. 가지, 주키니를 큐브로 잘라 올리브 오일에 굽는다. 방울토마토를 넣어 살짝 으깬다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "삶은 파스타, 올리브, 케이퍼를 넣어 버무린다. 바질을 뿌려 서빙한다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "이탈리아"
    ],
    "images": {
      "hero": "/images/recipes/CV23_hero.jpg",
      "steps": [
        "/images/recipes/CV23_step1.jpg",
        "/images/recipes/CV23_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 195,
      "saves": 105,
      "reviews": 55
    }
  },
  {
    "id": 36,
    "code": "CV27",
    "name": "칠리 두부 스크램블",
    "description": "멕시코 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "단백질": [
          {
            "name": "두부",
            "amount": "300",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "피망",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "터메릭",
            "amount": "3",
            "unit": "g"
          },
          {
            "name": "쿠민",
            "amount": "3",
            "unit": "g"
          },
          {
            "name": "고수",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "토스트 또는 또띠아",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "양파",
            "amount": "60",
            "unit": "g"
          },
          {
            "name": "토마토",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "칠리 파우더",
            "amount": "3",
            "unit": "g"
          }
        ]
      },
      "total": 9
    },
    "nutrition": {
      "칼로리": "505kcal",
      "탄수화물": "64g",
      "단백질": "27g",
      "지방": "18g",
      "나트륨": "867mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "두부를 손으로 부숴 스크램블 식감을 만든다. 양파, 피망을 볶고 토마토를 넣는다. 두부와 향신료를 넣어 볶는다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "터메릭이 달걀 색을 낸다. 고수를 뿌려 토스트나 또띠아와 함께 서빙한다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "멕시코"
    ],
    "images": {
      "hero": "/images/recipes/CV27_hero.jpg",
      "steps": [
        "/images/recipes/CV27_step1.jpg",
        "/images/recipes/CV27_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 212,
      "saves": 118,
      "reviews": 12
    }
  },
  {
    "id": 37,
    "code": "CV28",
    "name": "아보카도 스시 볼",
    "description": "일본 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "밥",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "아보카도",
            "amount": "1",
            "unit": "개"
          },
          {
            "name": "에다마메",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "간장",
            "amount": "20",
            "unit": "ml"
          },
          {
            "name": "와사비",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "김 가루",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "참깨",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "오이",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "당근",
            "amount": "60",
            "unit": "g"
          },
          {
            "name": "피클 생강",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 10
    },
    "nutrition": {
      "칼로리": "468kcal",
      "탄수화물": "77g",
      "단백질": "20g",
      "지방": "13g",
      "나트륨": "944mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "밥에 배합초를 섞어 초밥용 밥을 만든다. 아보카도, 오이, 당근을 슬라이스한다. 볼에 밥을 담고 채소를 섹션별로 올린다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "에다마메, 김 가루, 참깨를 뿌린다. 간장, 와사비, 피클 생강을 곁들인다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "일본"
    ],
    "images": {
      "hero": "/images/recipes/CV28_hero.jpg",
      "steps": [
        "/images/recipes/CV28_step1.jpg",
        "/images/recipes/CV28_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 229,
      "saves": 131,
      "reviews": 19
    }
  },
  {
    "id": 38,
    "code": "CV31",
    "name": "케일 시저 샐러드",
    "description": "미국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "채소류": [
          {
            "name": "케일",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "비건 파르미지아노",
            "amount": "20",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "비건 시저 드레싱",
            "amount": "60",
            "unit": "ml"
          },
          {
            "name": "크루통",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "레몬즙",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 5
    },
    "nutrition": {
      "칼로리": "412kcal",
      "탄수화물": "71g",
      "단백질": "26g",
      "지방": "11g",
      "나트륨": "517mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "케일을 잘게 찢어 올리브 오일과 소금으로 마사지한다. 비건 시저 드레싱을 뿌려 버무린다. 크루통과 비건 파르미지아노를 뿌린다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "레몬즙을 뿌려 서빙한다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "미국"
    ],
    "images": {
      "hero": "/images/recipes/CV31_hero.jpg",
      "steps": [
        "/images/recipes/CV31_step1.jpg",
        "/images/recipes/CV31_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 246,
      "saves": 144,
      "reviews": 26
    }
  },
  {
    "id": 39,
    "code": "CV35",
    "name": "흑임자 두부 샐러드",
    "description": "한국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "단백질": [
          {
            "name": "두부",
            "amount": "200",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "믹스 그린",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "흑임자 드레싱",
            "amount": "50",
            "unit": "ml"
          },
          {
            "name": "김 가루",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "참깨",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "오이",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "당근",
            "amount": "60",
            "unit": "g"
          }
        ]
      },
      "total": 7
    },
    "nutrition": {
      "칼로리": "466kcal",
      "탄수화물": "72g",
      "단백질": "23g",
      "지방": "12g",
      "나트륨": "984mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "두부를 깍둑 썰어 팬에 굽는다. 오이, 당근을 채 썬다. 믹스 그린 위에 채소와 두부를 올린다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "흑임자 드레싱을 뿌리고 김 가루, 참깨를 올린다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "한국"
    ],
    "images": {
      "hero": "/images/recipes/CV35_hero.jpg",
      "steps": [
        "/images/recipes/CV35_step1.jpg",
        "/images/recipes/CV35_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 263,
      "saves": 157,
      "reviews": 33
    }
  },
  {
    "id": 40,
    "code": "CV37",
    "name": "카레 두부 라이스",
    "description": "인도 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "단백질": [
          {
            "name": "두부",
            "amount": "200",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "카레 가루",
            "amount": "15",
            "unit": "g"
          },
          {
            "name": "코코넛 밀크",
            "amount": "150",
            "unit": "ml"
          },
          {
            "name": "냉동 채소 믹스",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "밥",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "고수",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "양파",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "마늘",
            "amount": "2",
            "unit": "쪽"
          }
        ]
      },
      "total": 8
    },
    "nutrition": {
      "칼로리": "474kcal",
      "탄수화물": "58g",
      "단백질": "15g",
      "지방": "19g",
      "나트륨": "506mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "두부를 깍둑 썬다. 양파, 마늘을 볶고 카레 가루를 넣어 향을 낸다. 코코넛 밀크, 두부, 채소를 넣어 10분간 끓인다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "밥 위에 올리고 고수를 뿌린다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "인도"
    ],
    "images": {
      "hero": "/images/recipes/CV37_hero.jpg",
      "steps": [
        "/images/recipes/CV37_step1.jpg",
        "/images/recipes/CV37_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 280,
      "saves": 170,
      "reviews": 40
    }
  },
  {
    "id": 41,
    "code": "CV40",
    "name": "퓨전 콩나물 비빔면",
    "description": "한국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "곡물": [
          {
            "name": "소면",
            "amount": "200",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "콩나물",
            "amount": "150",
            "unit": "g"
          },
          {
            "name": "김치",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "고추장",
            "amount": "30",
            "unit": "g"
          },
          {
            "name": "간장",
            "amount": "15",
            "unit": "ml"
          },
          {
            "name": "설탕",
            "amount": "10",
            "unit": "g"
          },
          {
            "name": "참기름",
            "amount": "15",
            "unit": "ml"
          },
          {
            "name": "참깨",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "오이",
            "amount": "80",
            "unit": "g"
          }
        ],
        "단백질": [
          {
            "name": "삶은 달걀 대신 두부",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 10
    },
    "nutrition": {
      "칼로리": "508kcal",
      "탄수화물": "65g",
      "단백질": "26g",
      "지방": "15g",
      "나트륨": "868mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "소면을 삶아 찬물에 헹군다. 콩나물을 데친다. 고추장, 간장, 설탕, 참기름을 섞어 양념을 만든다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "면에 양념을 넣어 비빈다. 콩나물, 채 썬 오이, 김치를 올린다. 두부와 참깨를 올린다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "한국"
    ],
    "images": {
      "hero": "/images/recipes/CV40_hero.jpg",
      "steps": [
        "/images/recipes/CV40_step1.jpg",
        "/images/recipes/CV40_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 297,
      "saves": 183,
      "reviews": 47
    }
  },
  {
    "id": 42,
    "code": "CV41",
    "name": "구운 채소 퀴노아 샐러드",
    "description": "미국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "곡물": [
          {
            "name": "퀴노아",
            "amount": "100",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "단호박",
            "amount": "150",
            "unit": "g"
          },
          {
            "name": "주키니",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "아루굴라",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "호박씨",
            "amount": "20",
            "unit": "g"
          },
          {
            "name": "레몬 드레싱",
            "amount": "40",
            "unit": "ml"
          }
        ],
        "채소류": [
          {
            "name": "적양파",
            "amount": "80",
            "unit": "g"
          }
        ]
      },
      "total": 7
    },
    "nutrition": {
      "칼로리": "521kcal",
      "탄수화물": "72g",
      "단백질": "16g",
      "지방": "16g",
      "나트륨": "758mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "퀴노아를 삶아 식힌다. 단호박, 주키니, 적양파를 올리브 오일에 버무려 오븐에서 20분간 굽는다. 퀴노아, 구운 채소, 아루굴라를 섞는다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "레몬 드레싱과 호박씨를 뿌린다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "미국"
    ],
    "images": {
      "hero": "/images/recipes/CV41_hero.jpg",
      "steps": [
        "/images/recipes/CV41_step1.jpg",
        "/images/recipes/CV41_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 314,
      "saves": 196,
      "reviews": 54
    }
  },
  {
    "id": 43,
    "code": "CV42",
    "name": "반미 샌드위치 비건",
    "description": "베트남 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "바게트",
            "amount": "1",
            "unit": "개"
          },
          {
            "name": "무 피클",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "고수",
            "amount": "15",
            "unit": "g"
          },
          {
            "name": "할라피뇨",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "간장 마요",
            "amount": "30",
            "unit": "ml"
          },
          {
            "name": "간장",
            "amount": "15",
            "unit": "ml"
          },
          {
            "name": "스리라차",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "단백질": [
          {
            "name": "두부",
            "amount": "150",
            "unit": "g"
          }
        ],
        "채소류": [
          {
            "name": "당근 피클",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "오이",
            "amount": "60",
            "unit": "g"
          }
        ]
      },
      "total": 10
    },
    "nutrition": {
      "칼로리": "535kcal",
      "탄수화물": "75g",
      "단백질": "28g",
      "지방": "10g",
      "나트륨": "910mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "두부를 슬라이스해 간장에 재워 팬에 굽는다. 바게트를 반으로 갈라 안을 살짝 파낸다. 간장 마요와 스리라차를 바른다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "두부, 피클 채소, 오이, 고수, 할라피뇨를 넣는다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "베트남"
    ],
    "images": {
      "hero": "/images/recipes/CV42_hero.jpg",
      "steps": [
        "/images/recipes/CV42_step1.jpg",
        "/images/recipes/CV42_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 331,
      "saves": 209,
      "reviews": 11
    }
  },
  {
    "id": 44,
    "code": "CV45",
    "name": "두부 포케 볼",
    "description": "하와이 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "단백질": [
          {
            "name": "두부",
            "amount": "200",
            "unit": "g"
          }
        ],
        "기타": [
          {
            "name": "밥",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "아보카도",
            "amount": "1",
            "unit": "개"
          },
          {
            "name": "에다마메",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "간장",
            "amount": "30",
            "unit": "ml"
          },
          {
            "name": "참기름",
            "amount": "10",
            "unit": "ml"
          },
          {
            "name": "김 가루",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "참깨",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "스리라차 마요",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "오이",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "당근",
            "amount": "60",
            "unit": "g"
          }
        ]
      },
      "total": 11
    },
    "nutrition": {
      "칼로리": "478kcal",
      "탄수화물": "70g",
      "단백질": "15g",
      "지방": "10g",
      "나트륨": "915mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "두부를 깍둑 썰어 간장, 참기름에 마리네이드한다. 볼에 밥을 담고 두부, 아보카도, 오이, 당근, 에다마메를 섹션별로 올린다. 김 가루, 참깨를 뿌리고 스리라차 마요를 뿌린다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "하와이"
    ],
    "images": {
      "hero": "/images/recipes/CV45_hero.jpg",
      "steps": [
        "/images/recipes/CV45_step1.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 348,
      "saves": 222,
      "reviews": 18
    }
  },
  {
    "id": 45,
    "code": "CV47",
    "name": "지중해 채소 구이 랩",
    "description": "지중해 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "또띠아",
            "amount": "2",
            "unit": "장"
          },
          {
            "name": "가지",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "주키니",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "후무스",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "페타 스타일 비건 치즈",
            "amount": "50",
            "unit": "g"
          }
        ],
        "채소류": [
          {
            "name": "파프리카",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "적양파",
            "amount": "60",
            "unit": "g"
          }
        ]
      },
      "total": 7
    },
    "nutrition": {
      "칼로리": "404kcal",
      "탄수화물": "77g",
      "단백질": "28g",
      "지방": "12g",
      "나트륨": "650mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "채소를 슬라이스해 그릴에 굽는다. 또띠아에 후무스를 바른다. 구운 채소와 비건 페타를 올려 단단히 말아 반으로 자른다.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "지중해"
    ],
    "images": {
      "hero": "/images/recipes/CV47_hero.jpg",
      "steps": [
        "/images/recipes/CV47_step1.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 365,
      "saves": 235,
      "reviews": 25
    }
  },
  {
    "id": 49,
    "code": "No.",
    "name": "메뉴명",
    "description": "출처국가 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "주재료",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 1
    },
    "nutrition": {
      "칼로리": "510kcal",
      "탄수화물": "60g",
      "단백질": "26g",
      "지방": "12g",
      "나트륨": "520mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "조리방법.",
        "tips": ""
      }
    ],
    "tags": [
      "비건",
      "건강식",
      "출처국가"
    ],
    "images": {
      "hero": "/images/recipes/No._hero.jpg",
      "steps": [
        "/images/recipes/No._step1.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 433,
      "saves": 87,
      "reviews": 53
    }
  },
  {
    "id": 50,
    "code": "CP01",
    "name": "연어 아보카도 덮밥",
    "description": "일본 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "연어회",
            "amount": "150",
            "unit": "g"
          },
          {
            "name": "밥",
            "amount": "250",
            "unit": "g"
          },
          {
            "name": "아보카도",
            "amount": "1",
            "unit": "개"
          },
          {
            "name": "간장",
            "amount": "20",
            "unit": "ml"
          },
          {
            "name": "와사비",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "참기름",
            "amount": "10",
            "unit": "ml"
          },
          {
            "name": "김 가루",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "참깨",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "오이",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "대파",
            "amount": "적당량",
            "unit": ""
          }
        ]
      },
      "total": 10
    },
    "nutrition": {
      "칼로리": "521kcal",
      "탄수화물": "67g",
      "단백질": "17g",
      "지방": "18g",
      "나트륨": "644mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "밥을 그릇에 담는다. 연어회를 슬라이스하고 아보카도, 오이도 슬라이스한다. 밥 위에 연어, 아보카도, 오이를 올린다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "간장, 와사비, 참기름을 섞어 뿌린다. 김 가루, 참깨, 대파를 올린다.",
        "tips": ""
      }
    ],
    "tags": [
      "페스코",
      "건강식",
      "일본"
    ],
    "images": {
      "hero": "/images/recipes/CP01_hero.jpg",
      "steps": [
        "/images/recipes/CP01_step1.jpg",
        "/images/recipes/CP01_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 450,
      "saves": 100,
      "reviews": 10
    }
  },
  {
    "id": 51,
    "code": "CP22",
    "name": "새우 아보카도 롤",
    "description": "일본 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "밥",
            "amount": "200",
            "unit": "g"
          },
          {
            "name": "새우 튀김",
            "amount": "4",
            "unit": "개"
          },
          {
            "name": "아보카도",
            "amount": "1",
            "unit": "개"
          },
          {
            "name": "김",
            "amount": "2",
            "unit": "장"
          },
          {
            "name": "마요네즈",
            "amount": "30",
            "unit": "ml"
          },
          {
            "name": "스리라차",
            "amount": "적당량",
            "unit": ""
          },
          {
            "name": "참깨",
            "amount": "적당량",
            "unit": ""
          }
        ],
        "채소류": [
          {
            "name": "오이 1/",
            "amount": "2",
            "unit": "개"
          }
        ]
      },
      "total": 8
    },
    "nutrition": {
      "칼로리": "546kcal",
      "탄수화물": "64g",
      "단백질": "26g",
      "지방": "17g",
      "나트륨": "866mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "밥에 배합초를 섞는다. 김 위에 밥을 펴고 새우 튀김, 아보카도, 오이를 올려 만다. 스리라차 마요를 뿌리고 참깨를 올린다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "한입 크기로 자른다.",
        "tips": ""
      }
    ],
    "tags": [
      "페스코",
      "건강식",
      "일본"
    ],
    "images": {
      "hero": "/images/recipes/CP22_hero.jpg",
      "steps": [
        "/images/recipes/CP22_step1.jpg",
        "/images/recipes/CP22_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 467,
      "saves": 113,
      "reviews": 17
    }
  },
  {
    "id": 52,
    "code": "CP36",
    "name": "참치 샐러드 랩",
    "description": "미국 스타일의 건강한 비건 요리",
    "servings": "2인분",
    "cookingTime": "30분",
    "difficulty": "보통",
    "ingredients": {
      "categories": {
        "기타": [
          {
            "name": "또띠아",
            "amount": "2",
            "unit": "장"
          },
          {
            "name": "참치캔",
            "amount": "100",
            "unit": "g"
          },
          {
            "name": "마요네즈",
            "amount": "30",
            "unit": "g"
          },
          {
            "name": "양상추",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "머스타드",
            "amount": "15",
            "unit": "g"
          }
        ],
        "채소류": [
          {
            "name": "토마토",
            "amount": "80",
            "unit": "g"
          },
          {
            "name": "오이",
            "amount": "50",
            "unit": "g"
          },
          {
            "name": "적양파",
            "amount": "20",
            "unit": "g"
          }
        ]
      },
      "total": 8
    },
    "nutrition": {
      "칼로리": "447kcal",
      "탄수화물": "77g",
      "단백질": "27g",
      "지방": "13g",
      "나트륨": "791mg"
    },
    "steps": [
      {
        "title": "1단계",
        "description": "참치를 마요네즈, 머스타드와 섞는다. 양상추, 토마토, 오이, 적양파를 썬다. 또띠아에 참치 혼합물과 채소를 올린다.",
        "tips": ""
      },
      {
        "title": "2단계",
        "description": "단단히 말아 반으로 자른다.",
        "tips": ""
      }
    ],
    "tags": [
      "페스코",
      "건강식",
      "미국"
    ],
    "images": {
      "hero": "/images/recipes/CP36_hero.jpg",
      "steps": [
        "/images/recipes/CP36_step1.jpg",
        "/images/recipes/CP36_step2.jpg"
      ]
    },
    "author": {
      "name": "슬런치팩토리",
      "avatar": "/images/slunch_logo.png"
    },
    "stats": {
      "likes": 484,
      "saves": 126,
      "reviews": 24
    }
  }
];
