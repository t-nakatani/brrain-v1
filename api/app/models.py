from pydantic import BaseModel


class Option(BaseModel):
    id: str  # 選択肢の識別子（例: "A", "B"）
    text: str  # 選択肢の説明


class FollowUp(BaseModel):
    question: str  # 確認質問文
    options: list[Option]  # 選択肢のリスト


class AgentResponse(BaseModel):
    user_input: str  # ユーザの入力
    surface_question: str  # 表面的な質問の抽出結果
    response_to_surface_question: str  # 表面的な質問に対する回答
    latent_intent: str  # 潜在的な意図の抽出結果
    follow_ups: list[FollowUp]  # フォローアップ質問のリスト
