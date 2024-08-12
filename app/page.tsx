import SearchBar from '@/components/SearchBar';
import Image from 'next/image';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-r from-slate-300 to-blue-400">
			<h1 className="font-bold text-3xl p-8 uppercase">Fantasy Draft Helper</h1>
			<SearchBar />
		</main>
	);
}
