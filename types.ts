export enum FeatureId {
  ROYAL_ADVISOR = 'royal_advisor',
  STRATEGIC_WAR_ROOM = 'strategic_war_room',
  CODE_SOVEREIGN = 'code_sovereign',
  CONTENT_SCRIBE = 'content_scribe',
  POLYGLOT_DIPLOMAT = 'polyglot_diplomat',
  MARKET_ORACLE = 'market_oracle',
  DREAM_INTERPRETER = 'dream_interpreter',
  CULINARY_MONARCH = 'culinary_monarch',
  LOGIC_ARBITER = 'logic_arbiter',
  EMAIL_EMPEROR = 'email_emperor',
  TRIVIA_TITAN = 'trivia_titan',
  POETIC_PRINCE = 'poetic_prince',
  SUMMARY_SULTAN = 'summary_sultan',
}

export interface FeatureConfig {
  id: FeatureId;
  name: string;
  description: string;
  icon: string;
  placeholder: string;
  buttonLabel: string;
  systemInstruction: string;
  model: string;
}

export interface HistoryItem {
  role: 'user' | 'model';
  text: string;
}