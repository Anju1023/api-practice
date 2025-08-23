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
			<div>
				<div>
					<div>🥖✨</div>
					<h2>ご注文ありがとうございます！</h2>
					<p>焼き立てパンをお楽しみください</p>
					<p>お会計: ￥{totalPrice}</p>
					<button onClick={clearOrder}>新しいご注文</button>
				</div>
			</div>
		);
	}
}
