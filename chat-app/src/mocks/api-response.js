export const mockResponse = {
  user_input: "予算3万円で旅行に行きたいです",
  surface_question: "3万円の予算で旅行先を探している",
  response_to_surface_question: "3万円の予算で楽しめる国内旅行先として、以下のような選択肢があります：\n1. 日帰り温泉旅行\n2. 近場の観光地への1泊2日旅行\n3. LCC利用での地方都市への旅行",
  latent_intent: "リーズナブルな価格で充実した旅行体験を求めている",
  follow_ups: [
    {
      id: "travel_style",
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
    },
    {
      id: "season",
      question: "どの季節に旅行をお考えですか？",
      options: [
        {
          id: "D",
          text: "春"
        },
        {
          id: "E",
          text: "夏"
        },
        {
          id: "F",
          text: "秋"
        },
        {
          id: "G",
          text: "冬"
        }
      ]
    }
  ]
}

export const getFollowUpResponse = (originalInput, selectedOption) => ({
  user_input: `${originalInput} → ${selectedOption.text}を選択`,
  surface_question: "選択された条件に基づく具体的な提案を求めている",
  response_to_surface_question: 
    selectedOption.id === "A" 
      ? "温泉旅行でしたら、3万円の予算で箱根や熱海への日帰り温泉旅行がおすすめです。温泉と食事付きのプランが多数あります。"
      : selectedOption.id === "B"
      ? "観光地めぐりでしたら、鎌倉や横浜などの近場の観光地への1泊2日の旅行がおすすめです。交通費を抑えることで、観光や食事を楽しむ予算が確保できます。"
      : "アクティビティ体験でしたら、富士山周辺でのアウトドア体験や、マリンスポーツなどが楽しめる湘南エリアがおすすめです。",
  latent_intent: "具体的な旅行プランの提案を求めている",
  follow_ups: [
    {
      id: "duration",
      question: "ご希望の旅行期間はありますか？",
      options: [
        {
          id: "H",
          text: "日帰り"
        },
        {
          id: "I",
          text: "1泊2日"
        },
        {
          id: "J",
          text: "2泊3日"
        }
      ]
    }
  ]
}) 