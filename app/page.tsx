import SearchBar from '@/components/SearchBar';
import Image from 'next/image';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h1 className="font-bold text-2xl p-6">Fantasy Draft Helper</h1>
			<SearchBar />
		</main>
	);
}
