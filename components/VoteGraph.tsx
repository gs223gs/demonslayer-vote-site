'use client';

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VoteDataByDate } from '@/app/actions/graph';

// 48キャラクター分の色を定義
const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3',
  '#48DBFB', '#0ABDE3', '#00D2D3', '#54A0FF', '#5F27CD', '#9B59B6',
  '#8E44AD', '#2C3E50', '#34495E', '#E74C3C', '#C0392B', '#D35400',
  '#E67E22', '#F39C12', '#F1C40F', '#27AE60', '#16A085', '#2ECC71',
  '#1ABC9C', '#3498DB', '#2980B9', '#9B59B6', '#8E44AD', '#7F8C8D',
  '#95A5A6', '#BDC3C7', '#ECF0F1', '#D5DBDB', '#AAB7B8', '#839192',
  '#717D7E', '#616A6B', '#515A5A', '#424949', '#FF5722', '#795548',
  '#607D8B', '#9E9E9E', '#FF9800', '#FFC107', '#FFEB3B', '#CDDC39'
];

interface VoteGraphProps {
  data: VoteDataByDate[];
  characters: Array<{
    id: string;
    name_ja: string;
    name_en: string;
    display_order: number;
  }>;
}

export function VoteGraph({ data, characters }: VoteGraphProps) {
  // 各キャラクターのラインを生成
  const lines = characters.map((character, index) => (
    <Line
      key={character.id}
      type="monotone"
      dataKey={character.id}
      name={character.name_ja}
      stroke={COLORS[index % COLORS.length]}
      strokeWidth={2}
      dot={false}
      activeDot={{ r: 4 }}
    />
  ));

  // カスタムTooltip
  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{
      dataKey: string;
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      // 投票数でソート（降順）
      const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
      
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <p className="font-bold mb-2">{label}</p>
          {sortedPayload.slice(0, 10).map((entry) => (
            <p key={entry.dataKey} style={{ color: entry.color }}>
              {entry.name}: {entry.value}票
            </p>
          ))}
          {sortedPayload.length > 10 && (
            <p className="text-gray-500 mt-2">
              他 {sortedPayload.length - 10} キャラクター
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>キャラクター別投票数推移</CardTitle>
        <CardDescription>
          日付ごとの各キャラクターの累積投票数
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={600}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              angle={-45}
              textAnchor="end"
              height={80}
              interval="preserveStartEnd"
            />
            <YAxis 
              label={{ value: '累積投票数', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              height={150}
              wrapperStyle={{
                paddingTop: '20px',
                overflowY: 'auto',
                maxHeight: '150px'
              }}
            />
            {lines}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}