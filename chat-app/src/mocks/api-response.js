export const mockResponse = {
  user_input: "予算3万円で旅行に行きたいです",
  surface_question: "3万円の予算で旅行先を探している",
  response_to_surface_question: "3万円の予算で楽しめる国内旅行先として、以下のような選択肢があります：\n1. 日帰り温泉旅行\n2. 近場の観光地への1泊2日旅行\n3. LCC利用での地方都市への旅行",
  latent_intent: "リーズナブルな価格で充実した旅行体験を求めている",
  follow_ups: [
    {
      question: "どのような旅行スタイルをお考えですか？",
      options: [
        {
          id: "A",
          text: "のんびり温泉旅行"
        },
        {
          id: "B",
          text: "観光地めぐり"
        },
        {
          id: "C",
          text: "アクティビティ体験"
        }
      ]
    }
  ]
} 