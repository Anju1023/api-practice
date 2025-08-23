'use client';

import { useState } from 'react';

interface BreadItem {
	id: string;
	name: string;
	price: number;
	emoji: string;
	category: 'sweet' | 'meal' | 'hard' | 'sandwich';
	description: string;
}

interface OrderItem {
	item: BreadItem;
	quantity: number;
}

interface BreadButtonProps {
	item: BreadItem;
	onClick: () => void;
	className?: string;
}

const breadItems: BreadItem[] = [
	// 甘いパン
	{
		id: 'melon',
		name: 'メロンパン',
		price: 160,
		emoji: '🍈',
		category: 'sweet',
		description: 'サクサクの外側ともちもちの中身',
	},
	{
		id: 'cream',
		name: 'クリームパン',
		price: 140,
		emoji: '🥛',
		category: 'sweet',
		description: '自家製カスタードクリームたっぷり',
	},
	{
		id: 'choco',
		name: 'チョコパン',
		price: 180,
		emoji: '🍫',
		category: 'sweet',
		description: 'ベルギー産チョコチップ入り',
	},
	{
		id: 'danish',
		name: 'デニッシュ',
		price: 220,
		emoji: '🥐',
		category: 'sweet',
		description: 'バター香る上品な甘さ',
	},
	{
		id: 'donut',
		name: 'ドーナツ',
		price: 120,
		emoji: '🍩',
		category: 'sweet',
		description: 'ふわふわ生地の手作りドーナツ',
	},

	// お食事パン
	{
		id: 'curry',
		name: 'カレーパン',
		price: 200,
		emoji: '🍛',
		category: 'meal',
		description: 'スパイシーなカレーがぎっしり',
	},
	{
		id: 'pizza',
		name: 'ピザパン',
		price: 250,
		emoji: '🍕',
		category: 'meal',
		description: 'トマトソースとチーズがとろ〜り',
	},
	{
		id: 'yakisoba',
		name: '焼きそばパン',
		price: 180,
		emoji: '🍝',
		category: 'meal',
		description: '昔懐かしい味の焼きそば入り',
	},
	{
		id: 'hotdog',
		name: 'ホットドッグ',
		price: 230,
		emoji: '🌭',
		category: 'meal',
		description: 'ジューシーなソーセージ',
	},

	// ハード系
	{
		id: 'baguette',
		name: 'バゲット',
		price: 280,
		emoji: '🥖',
		category: 'hard',
		description: '本格フランスパン',
	},
	{
		id: 'german',
		name: 'ライ麦パン',
		price: 320,
		emoji: '🍞',
		category: 'hard',
		description: 'ドイツ風ライ麦100%',
	},
	{
		id: 'focaccia',
		name: 'フォカッチャ',
		price: 240,
		emoji: '🫓',
		category: 'hard',
		description: 'オリーブオイル香るイタリアパン',
	},

	// サンドイッチ
	{
		id: 'egg_sand',
		name: 'たまごサンド',
		price: 300,
		emoji: '🥚',
		category: 'sandwich',
		description: 'ふわふわたまごサラダ',
	},
	{
		id: 'ham_sand',
		name: 'ハムサンド',
		price: 350,
		emoji: '🥪',
		category: 'sandwich',
		description: 'ハムと新鮮野菜',
	},
	{
		id: 'tuna_sand',
		name: 'ツナサンド',
		price: 320,
		emoji: '🐟',
		category: 'sandwich',
		description: 'ツナマヨとレタス',
	},
];

const BreadButton: React.FC<BreadButtonProps> = ({
	item,
	onClick,
	className = '',
}) => {
	const categoryColors = {
		sweet: 'bg-pink-100 hover:bg-pink-200 border-pink-300',
		meal: 'bg-orange-100 hover:bg-orange-200 border-orange-300',
		hard: 'bg-amber-100 hover:bg-amber-200 border-amber-300',
		sandwich: 'bg-green-100 hover:bg-green-200 border-green-300',
	};

	return (
		<button
			onClick={onClick}
			className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 active:scale-95 text-left h-full ${
				categoryColors[item.category]
			} ${className}`}
		>
			<div className="text-3xl mb-2">{item.emoji}</div>
			<div className="font-bold text-gray-800 mb-1">{item.name}</div>
			<div className="text-xs text-gray-600 mb-2 line-clamp-2">
				{item.description}
			</div>
			<div className="text-lg font-semibold text-gray-800">￥{item.price}</div>
		</button>
	);
};

interface OrderItemDisplayProps {
	orderItem: OrderItem;
	onAdd: () => void;
	onRemove: () => void;
}

const OrderItemDisplay: React.FC<OrderItemDisplayProps> = ({
	orderItem,
	onAdd,
	onRemove,
}) => {
	return (
		<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
			<div className="flex items-center gap-3">
				<span className="text-2xl">{orderItem.item.emoji}</span>
				<div>
					<div className="font-medium text-gray-800">{orderItem.item.name}</div>
					<div className="text-sm text-gray-600">￥{orderItem.item.price}</div>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<button
					onClick={onRemove}
					className="w-8 h-8 bg-red-400 hover:bg-red-500 text-white rounded-full text-lg font-bold transition-colors"
				>
					-
				</button>
				<span className="w-8 text-center font-semibold">
					{orderItem.quantity}
				</span>
				<button
					onClick={onAdd}
					className="w-8 h-8 bg-green-400 hover:bg-green-500 text-white rounded-full text-lg font-bold transition-colors"
				>
					+
				</button>
			</div>
		</div>
	);
};

export default function BakeryApp() {
	const [orders, setOrders] = useState<OrderItem[]>([]);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

	const addToOrder = (breadItem: BreadItem) => {
		setOrders((prev) => {
			const existingItem = prev.find((order) => order.item.id === breadItem.id);
			if (existingItem) {
				return prev.map((order) =>
					order.item.id === breadItem.id
						? { ...order, quantity: order.quantity + 1 }
						: order
				);
			} else {
				return [...prev, { item: breadItem, quantity: 1 }];
			}
		});
	};

	const increaseQuantity = (itemId: string) => {
		setOrders((prev) =>
			prev.map((order) =>
				order.item.id === itemId
					? { ...order, quantity: order.quantity + 1 }
					: order
			)
		);
	};

	const decreaseQuantity = (itemId: string) => {
		setOrders((prev) =>
			prev
				.map((order) =>
					order.item.id === itemId
						? { ...order, quantity: Math.max(0, order.quantity - 1) }
						: order
				)
				.filter((order) => order.quantity > 0)
		);
	};

	const totalPrice = orders.reduce(
		(sum, order) => sum + order.item.price * order.quantity,
		0
	);

	const clearOrder = () => {
		setOrders([]);
		setShowConfirmation(false);
	};

	const confirmOrder = () => {
		if (orders.length > 0) {
			setShowConfirmation(false);
		}
	};

	const sweetBreads = breadItems.filter((item) => item.category === 'sweet');
	const mealBreads = breadItems.filter((item) => item.category === 'meal');
	const hardBreads = breadItems.filter((item) => item.category === 'hard');
	const sandwiches = breadItems.filter((item) => item.category === 'sandwich');

	if (showConfirmation) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 flex items-center justify-center p-4">
				<div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
					<div className="text-6xl mb-4">🥖✨</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						ご注文ありがとうございます！
					</h2>
					<p className="text-gray-600 mb-2">焼き立てパンをお楽しみください</p>
					<p className="text-xl font-semibold text-gray-800 mb-6">
						お会計: ￥{totalPrice}
					</p>
					<button
						onClick={clearOrder}
						className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
					>
						新しいご注文
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-300 to-red-300 p-4">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-white mb-2">
						🥖 ベーカリー 🥖
					</h1>
					<p className="text-white text-lg">
						毎日焼き立て♪ 愛情たっぷりのパン屋さん
					</p>
				</div>

				<div className="grid lg:grid-cols-4 gap-6">
					{/* メニュー部分 */}
					<div className="lg:col-span-3">
						<div className="bg-white rounded-3xl shadow-xl p-6">
							{/* 甘いパン */}
							<div className="mb-8">
								<h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
									🍈 甘いパン
								</h2>

								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
									{sweetBreads.map((item) => (
										<BreadButton
											key={item.id}
											item={item}
											onClick={() => addToOrder(item)}
										/>
									))}
								</div>
							</div>

							{/* お食事パン */}
							<div className="mb-8">
								<h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
									🍛 お食事パン
								</h2>
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
									{mealBreads.map((item) => (
										<BreadButton
											key={item.id}
											item={item}
											onClick={() => addToOrder(item)}
										/>
									))}
								</div>
							</div>

							{/* ハード系パン */}
							<div className="mb-8">
								<h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
									🥖 ハード系パン
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{hardBreads.map((item) => (
										<BreadButton
											key={item.id}
											item={item}
											onClick={() => addToOrder(item)}
										/>
									))}
								</div>
							</div>

							{/* サンドイッチ */}
							<div>
								<h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
									🥪 サンドイッチ
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{sandwiches.map((item) => (
										<BreadButton
											key={item.id}
											item={item}
											onClick={() => addToOrder(item)}
										/>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* 注文確認部分 */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-3xl shadow-xl p-6 sticky top-4">
							<h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
								🛒 お買い物かご
							</h2>

							{orders.length === 0 ? (
								<div className="text-center py-8">
									<div className="text-4xl mb-2">🥖</div>
									<p className="text-gray-500">
										お好きなパンを
										<br />
										選んでくださいね♪
									</p>
								</div>
							) : (
								<div className="space-y-3 mb-6">
									{orders.map((order) => (
										<OrderItemDisplay
											key={order.item.id}
											orderItem={order}
											onAdd={() => increaseQuantity(order.item.id)}
											onRemove={() => decreaseQuantity(order.item.id)}
										/>
									))}
								</div>
							)}

							{orders.length > 0 && (
								<>
									<div className="border-t pt-4 mb-6">
										<div className="flex justify-between items-center text-xl font-bold">
											<span>合計</span>
											<span className="text-orange-600">￥{totalPrice}</span>
										</div>
										<p className="text-sm text-gray-500 mt-1">
											{orders.reduce((sum, order) => sum + order.quantity, 0)}
											個のパン
										</p>
									</div>

									<div className="space-y-3">
										<button
											onClick={confirmOrder}
											className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg"
										>
											🛒 レジに進む
										</button>
										<button
											onClick={clearOrder}
											className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
										>
											かごを空にする
										</button>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
