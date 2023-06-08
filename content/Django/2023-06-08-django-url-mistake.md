---
title: "Django URL 실수"
date: 2023-06-08
subtitle: "설계부터 URL을 잘 짜자"
category: "Django"
draft: false
---

```python
urlpatterns = [
    path('review/<int:campaign_id>/', views.CampaignReviewView.as_view(), name='campaign_review_view'),
    path('review/<int:review_id>/', views.CampaignReviewDetailView.as_view(), name='campaign_review_detail_view'),
]
```

작성했던 urls.py

작성 후 테스트를 위해 테스트코드를 작성하는데,

계속해서 `AssertionError: 405 != 200`가 떴다.

```python
class CampaignReviewUpdateDeleteTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        """
                    ...
                    생략
                    ...
        """

    def test_update_campaign_review(self):
        """
        캠페인 리뷰 PUT 요청 테스트함수입니다.
        """
        review = CampaignReview.objects.get(title=self.review_data['title'])
        url = review.get_absolute_url()
        response = self.client.put(
            path=url,
            data=self.new_review_data,
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}",
        )
        print(response.data)
        self.assertEqual(response.status_code, 200)

    def test_delete_campaign_review(self):
        """
        캠페인 리뷰 DELETE 요청 테스트함수입니다.
        """
        review = CampaignReview.objects.get(title=self.review_data['title'])
        url = review.get_absolute_url()
        response = self.client.delete(
            path=url,
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}",
        )
        print(response.data)
        self.assertEqual(response.status_code, 204)
```

겉보기엔 문제가 없어보였는데, `urlpattern`이 문제였다.

`campaigns/review/1/`이라는 url이 `<int:campaign_id>`와 `<int:review_id>`를 동시에 가리키고 있었다.

그러니 url이 get과 post함수만 작성했던 campaign_id로 인지해, 계속 `405 Method Not Allowed`가 status 코드로 날아왔던 것..

같은 url을 가리키고 있을 땐 후자는 무시된다는 사실을 알 수 있긴했지만 알아차리기까지 너무 오랜시간이 걸린 것 같다.

한가지 다행인 점은 Test코드 작성할 때,  
`python manage.py test campaigns.tests.test_campaign_review.TestClass`
이런 식으로 .으로 붙여 테스트의 경로를 지정해 개별적으로 테스트 해볼 수 있다는 사실을 알게되었다.
