---
title: "axios Post 요청, formData"
date: 2023-06-13
subtitle: "axios"
category: "React"
draft: false
---

# axios Post

[Axios로 POST 요청을 시작하는 방법](https://axios-http.com/kr/docs/post_example)

```js
const CampaignCreate = () => {
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignContent, setCampaignContent] = useState("");
  const [campaignMembers, setCampaignMembers] = useState("");
  const [campaignImage, setCampaignImage] = useState("");
  const [campaignStartDate, setCampaignStartDate] = useState("");
  const [campaignEndDate, setCampaignEndDate] = useState("");
  const [activityStartDate, setActivityStartDate] = useState("");
  const [activityEndDate, setActivityEndDate] = useState("");
  const [isFundChecked, setIsFundChecked] = useState(false);
  const [campaignFundGoal, setCampaignFundGoal] = useState(0);
  const [campaignApproveFile, setCampaignApproveFile] = useState("");

  const [selectedImageName, setSelectedImageName] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  // axios Post
  const token = localStorage.getItem("access");
  const axiosCampaignCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", campaignTitle);
    formData.append("content", campaignContent);
    formData.append("members", campaignMembers);
    formData.append("image", campaignImage);
    formData.append("campaign_start_date", campaignStartDate);
    formData.append("campaign_end_date", campaignEndDate);
    formData.append("activity_start_date", activityStartDate);
    formData.append("activity_end_date", activityEndDate);
    formData.append("status", 1);
    formData.append("is_funding", isFundChecked);
    formData.append("goal", campaignFundGoal);
    formData.append("current", 0);
    formData.append("approve_file", campaignApproveFile);

    try {
      const response = await axios.post(
        `http://localhost:8000/campaigns/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          transformRequest: [
            function () {
              return formData;
            },
          ],
        }
      );
      alert("캠페인 신청 성공");
      console.log(response);
    } catch (error) {
      alert("캠페인 신청에 실패했습니다.");
      console.log(error);
    }
  };
};
```

formData 객체가 error response로 확인할 때 계속 `formData {}`로 빈 객체로 나와서  
데이터가 원하는대로 append되지 않고있는 줄 알았다.

알고보니 formData 객체도 HTMLCollection같은 유사배열객체라서 일반적인 방법으론 확인할 수 없었던 것

```js
for (const value of formData.values()) {
  console.log(value);
}
```

위의 코드로 데이터가 제대로 POST요청이 되고 있는지 확인할 수 있었다
