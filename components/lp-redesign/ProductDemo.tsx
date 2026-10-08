'use client';
import { useState } from 'react';
import { booking, homeStates, recoveryTransition, type RecoveryState } from '@/lib/home-demo';
import { Icon } from './Primitives';
export default function ProductDemo({ interactive = false, compact = false }: {
    interactive?: boolean;
    compact?: boolean;
}) {
    const [state, setState] = useState<RecoveryState | 'response'>('response');
    const ready = state === 'ready' || state === 'recovered';
    const changed = state === 'invalidated' || state === 'candidate';
    const score = ready ? homeStates.ready.readiness : changed ? homeStates.invalidated.readiness : homeStates.response.readiness;
    const label = ready ? '確認済み' : state === 'invalidated' ? '再確認が必要' : state === 'candidate' ? '代替候補を照合待ち' : '回答を照合待ち';
    function advance() {
        if (state === 'response')
            setState('ready');
        else if (state === 'ready')
            setState(recoveryTransition(state, 'cancel'));
        else if (state === 'invalidated')
            setState(recoveryTransition(state, 'evaluate'));
        else if (state === 'candidate')
            setState(recoveryTransition(state, 'verify'));
        else
            setState('response');
    }
    const buttonLabel = state === 'response' ? '回答の条件を照合する' : state === 'ready' ? '予定変更を試す' : state === 'invalidated' ? '代替候補を確認する' : state === 'candidate' ? '新しい証拠を照合する' : 'はじめから見る';
    return <div className={`lp-product ${compact ? 'lp-product-compact' : ''}`}>
    <div className="lp-product-bar"><span><i /> OPERATIONS WORKSPACE</span><span className="lp-demo-tag">DEMO</span></div>
    <div className="lp-product-body">
      <div className="lp-product-heading"><div><span className="lp-overline">{booking.id} · 京都</span><p className="lp-product-title">Kyoto Private Tour</p><p>10月18日 · 09:00 · 6名 · 英語対応</p></div><span className="lp-trip-symbol"><Icon name="shield" size={27}/></span></div>
      <div className="lp-readiness" aria-live={interactive ? 'polite' : 'off'} aria-atomic="true"><div><span>催行準備の状態</span><strong>{label}</strong></div><div className="lp-score">{score}<span>%</span></div><div className="lp-progress"><div style={{ width: `${score}%` }}/></div><p>デモ内の準備率・顧客の実績値ではありません</p></div>
      <div className="lp-worklist"><div className="lp-worklist-title"><span>主な確認項目</span><span>状態</span></div>{[['ガイド確認', ready ? '確認済み' : changed ? '再確認' : '照合待ち'], ['車両の条件', '確認済み'], ['旅程の整合', '確認済み']].map(([task, status]) => <div className="lp-work-row" key={task}><span><Icon name={status === '確認済み' ? 'check' : 'refresh'} size={17}/>{task}</span><span className={status === '確認済み' ? 'lp-status' : 'lp-status lp-status-pending'}>{status}</span></div>)}</div>
      {!compact && <div className="lp-evidence"><div><Icon name="mail" size={16}/><span>{changed ? '変更を検知' : ready ? '照合した証拠' : '新しい回答を受信'}</span></div><p>{state === 'invalidated' ? 'ガイドがキャンセル。以前の確認は無効になりました。' : state === 'candidate' ? '代替候補の言語・資格・重複アサインを確認します。' : state === 'recovered' ? '代替ガイドの回答と必要条件を再確認しました。' : '「英語でご案内できます。08:40までに到着します。」'}</p><span>{ready ? '必要条件の照合 → 完了' : '回答受信 ≠ 確認済み'}</span></div>}
      {interactive && <button type="button" className="lp-demo-action" onClick={advance}>{buttonLabel}<Icon name="arrow" size={18}/></button>}
    </div>
    <p className="lp-product-caption">説明用UI · 合成データ · 実送信なし</p>
  </div>;
}
