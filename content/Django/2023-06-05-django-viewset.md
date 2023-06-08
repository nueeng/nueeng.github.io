---
title: "APIView vs Viewsets"
date: 2023-06-05 20:22:13
subtitle: "viewset을 알아보자"
category: "Django"
draft: false
---
  
[Django APIView vs Viewsets Which one to Choose?](https://medium.com/@p0zn/django-apiview-vs-viewsets-which-one-to-choose-c8945e538af4)를 번역한 글입니다.

![APIView_Viewset](apiview_viewset.webp)

Django Rest Framework로 API를 만들어 나갈 때, 선택할 수 있는 주요 선택지 중 두가지는 APIView와 Viewset일 것입니다. 두 선택지의 큰 차이점은 APIView는 하나의 HTTP Request만을 처리할 수 있는 반면, Viewset은 여러 HTTP Request를 처리할 수 있습니다.

두 클래스를 간단하게 분석해봅시다.

<hr/>

APIView와 Viewset은 특정 요구에 따라 차이점이 나타납니다. 코드 기반 예시와 함께 어느 클래스가 사용되어야하는지 살펴봅시다.

예를들어, `Blog Post model`이 있고, 우리는 view를 통해 create, update, delete method가 user를 통해 구현되어야 하는 상황이라고 가정합시다.  

APIView를 사용한 view를 작성해본다면 다음과 같습니다.

```python
class BlogPostAPIView(APIView):
    def get(self, request):
        blog_posts = BlogPost.objects.all()
        serializer = BlogPostSerializer(blog_posts, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

위의 예시 코드에서, get() 메소드는 블로그의 모든 포스트들을 불러오고, post() 메소드는 새로운 포스트를 작성합니다. 이는 APIView가 사용하여 HTTP Request에 대한 메소드가 분리되어 작성되었다는 것을 나타냅니다.

다음으로, Viewset을 사용한 같은 코드를 봐봅시다.

```python
class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
```

마법같지 않나요?

BlogPostViewSet class를 사용한 이번 예시 코드에서는 ModelViewSet class를 상속받아 기본적으로 미리 정의된 CRUD 메소드를 APIView와 동일하게 수행합니다.

여기서 우리는 APIView로 작성된 이전 코드에 비해 Viewset을 사용한 예제 코드를 훨씬 간결하게 작성할 수 있었습니다. Viewset은 미리 클래스에 정의되어있는 몇 가지의 메소드들을 통해 보다 더 쉽게 모델 작업을 수행합니다. Viewset의 커스터마이즈를 위해, DRF에서 제공하는 메소드들을 통해 Viewset을 쉽게 확장시킬 수 있습니다.

또한 Viewset과 결합된 Router는 자동으로 URL과 매칭하여 View class와 URL을 연결하여 URL 라우팅을 쉽게 수행합니다. 이는 특히 큰 규모의 프로젝트나 수많은 모델로 작업하는 프로젝트에서 유용합니다.

Router와 Viewset이 어떻게 결합하는지 위의 예시코드를 사용하여 봐볼게요!

```python
router = routers.DefaultRouter()
router.register(r'blog-posts', BlogPostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

위의 예시코드에서는 Router 엘리먼트가 Viewset class를 등록하고, 자동으로 CRUD 에 필요한 URL을 생성합니다. 이렇게 Viewset과 Router를 통해 GET, POST, PUT, PATCH 그리고 DELETE 요청을 `"/blog-posts/"`에 보냄으로써 기본적인 CRUD를 수행할 수 있습니다.

<br/>

## 결론

1. APIView는 Class-based View 하나의 HTTP 요청에만 응답합니다. 반면 Viewset은 여러개의 HTTP 요청을 처리합니다. 따라서 APIView로 각 CRUD에 대한 별도의 View class를 생성해줘야 하지만, Viewset을 사용하면 여러 메소드로 여러 작업을 수행할 수 있습니다.  

2. APIView에는 각 HTTP 요청에 특정한 메소드가 포함되어 있지만, Viewset은 기본 CRUD 메소드가 이미 제공됩니다. 따라서 Viewset은 모델 작업을 위해 미리 정의된 메소드 집합을 제공하며, 이러한 메소드를 사용하여 쉽게 모델 작업을 수행할 수 있습니다.  

3. APIView는 선택적으로 매개변수를 사용하여 자세한 커스터마이징을 할 수 있는 유연함이 있지만, Viewset은 일반적으로 기본 CRUD 메소드를 사용하여 작업하기 때문에 커스터마이징 가능성이 적습니다.  

4. APIView는 코드를 직접 제어할 수 있기 때문에 유연성 수준이 높습니다. Viewset은 더 높은 수준의 추상화를 제공하며 모델 작업을 쉽게 처리하기 위해 미리 만들어져있는 메소드를 제공합니다.(원본 기사내용이 틀린 것 같습니다. 유연성이 낮다고 하고있네요)

5. APIView는 Django의 기본 View 클래스에서 상속되었으며, Viewset은 Django Rest Framework의 특별한 ViewSet 클래스로부터 상속됩니다.

결과적으로, Django Rest Framework에서 APIView와 Viewset은 서로 다른 용도를 가지고 있습니다. APIView는 복잡하지 않거나 사용자 정의된 작업에 적합하며, Viewset은 더 복잡한 작업 및 CRUD 작업을 쉽게 처리하기 위해 사용됩니다.

---

추가학습 - OOP 추상화, [Viewset Class Def - cdrf](https://www.cdrf.co/3.13/rest_framework.viewsets/ViewSet.html)