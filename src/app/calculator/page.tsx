'use client';

import { useEffect, useState } from 'react';

// Buttonに5種類のプロパティがあるよ
type ButtonType = 'number' | 'operator' | 'equals' | 'clear' | 'delete';

interface ButtonProps {
	value: string; // ボタンに書いてある数字
	onClick: () => void; // ボタン押したときの動作
	type: ButtonType; // さっき決めた5種類のどれか
	className?: string; // 追加のデザイン (?は「なくてもOK」の印)
}

// ボタンの設計図
const Button: React.FC<ButtonProps> = ({
	value,
	onClick,
	type,
	className = '',
}) => {
	// 全てのボタンに共通するデザイン
	const baseClasses =
		'h-16 text-xl font-semibold rounded-xl transition-all duration-200 hover:-translate-y-1 active:translate-y-0';

	// ボタンの種類ごとに色を変える
	const typeClasses = {
		number: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
		operator: 'bg-red-400 hover:bg-red-500 text-white',
		equals: 'bg-teal-400 hover:bg-teal-500 text-white row-span-2',
		clear: 'bg-orange-400 hover:bg-orange-500 text-white',
		delete: 'bg-orange-400 hover:bg-orange-500 text-white',
	};

	return (
		<button
			onClick={onClick}
			className={`${baseClasses} ${typeClasses[type]} ${className}`}
		>
			{value}
		</button>
	);
};

export default function Calculator() {
	const [display, setDisplay] = useState<string>('0'); // 画面に表示する文字(最初は'0')
	const [shouldResetDisplay, setShouldResetDisplay] = useState<boolean>(false); // 「次に数字押したら画面リセットする？」フラグ

	const updateDisplay = (value: string) => {
		if (shouldResetDisplay) {
			// リセットフラグが立ってたら
			setDisplay(value === '.' ? '0.' : value); // 新しく始める
			setShouldResetDisplay(false); // フラグをおろす
		} else {
			if (display === '0' && value !== '.') {
				// 最初の0を置き換え
				setDisplay(value);
			} else {
				setDisplay((prev) => prev + value); // 後ろに追加
			}
		}
	};

	const clearDisplay = () => {
		setDisplay('0'); // 0に戻す
	};

	const deleteLast = () => {
		if (display.length > 1) {
			setDisplay((prev) => prev.slice(0, -1)); // 最後の1文字を削除
		} else {
			setDisplay('0'); // 1文字しかなかったら0にする
		}
	};

	const calculate = () => {
		try {
			// ×を*に変換
			const expression = display.replace(/×/g, '*');
			const result = eval(expression); // 計算実行

			// 小数点以下の桁数を制限
			const finalResult = !Number.isInteger(result)
				? parseFloat(result.toFixed(10)) // 小数点10桁まで
				: result;

			setDisplay(finalResult.toString());
			setShouldResetDisplay(true); // 次は新しく始めるフラグ
		} catch (error) {
			setDisplay('エラー'); // 計算できなかったらエラー表示
			setShouldResetDisplay(true);
		}
	};

	// キーボード操作
	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			const key = event.key;

			if ((key >= '0' && key <= '9') || key === '.') {
				updateDisplay(key); // 数字キーを押したら数字追加
			} else if (key === '+' || key === '-') {
				updateDisplay('×');
			} else if (key === '/') {
				event.preventDefault();
				updateDisplay('/');
			} else if (key === 'Enter' || key === '=') {
				calculate(); // Enterや=で計算
			} else if (key === 'Backspace') {
				deleteLast();
			}
		};

		window.addEventListener('keydown', handleKeydown); // キーボード監視
		return () => window.removeEventListener('keydown', handleKeydown); // お掃除
	}, [display, shouldResetDisplay]); // displayが変わったら再設定

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 flex items-center justify-center p-4">
			<div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm">
				<h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
					電卓
				</h1>

				{/* ディスプレイ */}
				<div className="mb-6">
					<input
						type="text"
						value={display}
						readOnly
						className="w-full h-20 text-3xl text-right bg-gray-50 rounded-xl px-4 border-none outline-none "
					/>
				</div>

				{/* ボタングリッド */}
				<div className="grid grid-cols-4 gap-3">
					<Button value="C" onClick={clearDisplay} type="clear" />
					<Button
						value="/"
						onClick={() => updateDisplay('/')}
						type="operator"
					/>
					<Button
						value="×"
						onClick={() => updateDisplay('×')}
						type="operator"
					/>
					<Button value="←" onClick={deleteLast} type="delete" />

					<Button value="7" onClick={() => updateDisplay('7')} type="number" />
					<Button value="8" onClick={() => updateDisplay('8')} type="number" />
					<Button value="9" onClick={() => updateDisplay('9')} type="number" />
					<Button
						value="-"
						onClick={() => updateDisplay('-')}
						type="operator"
					/>

					<Button value="4" onClick={() => updateDisplay('4')} type="number" />
					<Button value="5" onClick={() => updateDisplay('5')} type="number" />
					<Button value="6" onClick={() => updateDisplay('6')} type="number" />
					<Button
						value="+"
						onClick={() => updateDisplay('+')}
						type="operator"
					/>

					<Button value="1" onClick={() => updateDisplay('1')} type="number" />
					<Button value="2" onClick={() => updateDisplay('2')} type="number" />
					<Button value="3" onClick={() => updateDisplay('3')} type="number" />
					<Button value="=" onClick={calculate} type="equals" />

					<Button
						value="0"
						onClick={() => updateDisplay('0')}
						type="number"
						className="col-span-2"
					/>
					<Button value="." onClick={() => updateDisplay('.')} type="number" />
				</div>
			</div>
		</div>
	);
}
