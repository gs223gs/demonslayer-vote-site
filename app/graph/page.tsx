import { getVoteDataByDate } from '@/app/actions/graph';
import { VoteGraph } from '@/components/VoteGraph';
import { TotalVotesGraph } from '@/components/TotalVotesGraph';

export default async function GraphPage() {
  const { data, characters } = await getVoteDataByDate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">投票数推移グラフ</h1>
      <div className="space-y-8">
        <TotalVotesGraph data={data} characters={characters} />
        <VoteGraph data={data} characters={characters} />
      </div>
    </div>
  );
}