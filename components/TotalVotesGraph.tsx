'use client';

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VoteDataByDate } from '@/app/actions/graph';

interface TotalVotesGraphProps {
  data: VoteDataByDate[];
  characters: Array<{
    id: string;
    name_ja: string;
    name_en: string;
    display_order: number;
  }>;
}

export function TotalVotesGraph({ data, characters }: TotalVotesGraphProps) {
  // 各日の総投票数を計算
  const totalVotesData = data.map(dayData => {
    let total = 0;
    characters.forEach(char => {
      const votes = dayData[char.id];
      if (typeof votes === 'number') {
        total += votes;
      }
    });
    
    return {
      date: dayData.date,
      total: total
    };
  });

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
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-bold">{label}</p>
          <p className="text-green-600">
            総投票数: {payload[0].value?.toLocaleString()}票
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>総投票数の推移</CardTitle>
        <CardDescription>
          日付ごとの累積総投票数
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={totalVotesData}
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
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              name="総投票数"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}