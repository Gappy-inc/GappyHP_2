'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
const entries = [
    ['まだ導入を決めていなくても相談できますか？', 'はい。まずは情報収集や現状の課題整理を目的としたご相談でも問題ありません。'],
    ['相談前に準備しておくものはありますか？', '現在行っている予約後業務や、特に負担に感じている作業を整理していただくと、より具体的にご相談いただけます。'],
    ['現在の予約システムを変更する必要がありますか？', '必ずしも全面的な入れ替えを前提とはしていません。現在ご利用中のシステムを伺い、連携や導入方法を個別に確認します。'],
    ['どの業務からAIを導入できますか？', '予約後の確認・催促・変更対応などが検討対象です。実際の適用可能性は、現在の運用方法や必要な権限を確認したうえで判断します。'],
    ['導入にはどのくらいの期間がかかりますか？', '対象業務や必要な連携、検証範囲によって異なります。オンライン相談で状況を伺い、進め方をご案内します。'],
    ['料金についても相談できますか？', 'はい。利用を想定している業務範囲や規模を伺い、提供条件についてご案内します。'],
];
export default function FAQ() {
    const [open, setOpen] = useState<number[]>([]);
    return <div className="co-faq-list">{entries.map(([q, a], i) => { const expanded = open.includes(i); return <article key={q}><h3><button id={`co-question-${i}`} type="button" aria-expanded={expanded} aria-controls={`co-answer-${i}`} onClick={() => setOpen(items => expanded ? items.filter(x => x !== i) : [...items, i])}><span className="co-q" aria-hidden="true">Q</span><span>{q}</span>{expanded ? <Minus aria-hidden="true"/> : <Plus aria-hidden="true"/>}</button></h3><div id={`co-answer-${i}`} role="region" aria-labelledby={`co-question-${i}`} hidden={!expanded}><p>{a}</p></div></article>; })}</div>;
}
