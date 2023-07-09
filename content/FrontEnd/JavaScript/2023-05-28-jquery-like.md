---
title: "Jquery Like 구현"
date: 2023-06-14
subtitle: "Like"
category: "JavaScript"
draft: false
---

```python
# views.py
class LikeView(APIView):
    def post(self, request, movie_id, review_id):
        review = get_object_or_404(Review, id = review_id, movie=movie_id)
        if request.user in review.like.all():
            review.like.remove(request.user)
            return Response({'message':'좋아요 취소!'}, status=status.HTTP_200_OK)
        else:
            review.like.add(request.user)
            return Response({'message':'좋아요 성공!'}, status=status.HTTP_200_OK)
```

```js
// JavaScript
// jquery의 ajax 통신으로 새로고침 없이도 구현할 수 있도록 해야했음.
function likeReview(movie_id, review_id) {
  $.ajax({
    url: `${backend_base_url}/reviews/${movie_id}/${review_id}/like/`,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    success: function (response) {
      let likesCount = $(`#button-${review_id}`).find("#likeCount");
      let currentLikesCount = parseInt(likesCount.text());

      if (response.message === "좋아요 취소!") {
        likesCount.text(currentLikesCount - 1);
      } else if (response.message === "좋아요 성공!") {
        likesCount.text(currentLikesCount + 1);
      }

      alert(response.message);
    },
    error: function (response) {
      alert(response.message);
    },
  });
}
```

vanilla javascript의 fetch로 전부 백과 프론트를 연결하고 있었는데, 좋아요 기능은 누르면 바로바로 count가 올라갈 수 있게끔, 해보고싶었다.

이를 위해서는 jquery의 ajax 통신으로 새로고침 없이도 구현할 수 있도록 해야했다.

Backend에서 오는 response의 메세지를 통해 좋아요가 취소인지, 성공인지 구분해 +-를 줬는데, 좋은 방법인지는 모르겠다.  
더 좋은 방식을 찾아야할 것 같고, 버튼을 자기가 누른 상태이면 버튼을 누른 상태로 고정시키는 방법도 알고싶었는데, 더 공부해야할 것 같다.
