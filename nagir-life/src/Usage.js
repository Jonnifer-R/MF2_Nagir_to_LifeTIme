import React, {Component} from 'react';

class Usage extends Component {
  render() {
    return (
      <div>
        <hr width="70%"/>
        <h2>- 概要と使い方 - </h2>
        <div className="usage-inline">
          <ol>
            <li id="i1"><h5>目的</h5>
              <ul><li>
                ピーク告知と引退勧告1までに与えたナギールの数から
                モンスターの成長タイプと寿命を一意に求める。<br />
                寿命は[ 211～700週 ]の範囲にあるものとする。
              </li></ul>
            </li>

            <li id="i2"><h5>定義</h5>
              <ul>
                <li>ナギール＋休養(寿命-21週) ＝ 1ナギール</li>
                <li>1ナギール後の週明けに告知 ＝ ナギール数1と入力</li>
                <li>ピーク告知 ＝ 「これからが大事な時期」or「腕の見せ所」</li>
                <li>引退勧告1 ＝ 残り寿命50週未満 ＝ 「調子が悪いみたい」</li>
              </ul>
            </li>

            <li id="i3"><h5>手順</h5>
              <ol>
                <li>ピーク告知を受けるまで、ナギール＋休養を繰り返す。</li>
                <li>ピーク告知を受けたら<b>「ピーク告知」</b>にナギール数を入力する。</li>
                <li>トレーニングで成長適正を判定する。(ピーク)</li>
                  ※上昇値だけを見てリロードを繰り返す。
                  <p />

                <li>(早熟と持続の判定)</li>
                  ナギール数[ 4～8 ]でピーク告知がある場合に必要となる。<br />
                  ( モンスターの寿命が[ 211～550週 ]であると過程 )<br />
                  別項に詳細を記す。
                  <p />

                <li>引退勧告1を受けるまで、再びナギール＋休養を繰り返す。</li>
                <li>引退勧告1を受けたら<b>「引退勧告1」</b>にナギール数を入力する。</li>
                <li>最後に正確な寿命を測定する。<br />
                  引退勧告1からナギール＋休養を1回行い、残りは休養のみを繰り返す。<br />
                  この工程後の残り寿命範囲は[ 8-28週 ]である。
                </li>
                <li>寿命が一意に定まり、成長タイプも合わせて特定できる。</li>
                <p />
              </ol>
            </li>

            <li id="i4"><h5>早熟と持続の判定</h5>
              <ul>
                <li>ピーク告知後にさらにナギールを与えたときの成長段階の違いにより
                  早熟と持続の区別を行うことができる。
                </li>
                <p />
                <li>ピーク告知 ナギール数[ 4-6 ] / 推定寿命[ 211-420週 ]</li>
                  <ul>
                    <li>ピーク告知後に1ナギールを与えて成長段階を見る。</li>
                    <li>成長段階を<b>「+1ナギール」</b>に入力する。</li>
                  </ul>
                <li>ピーク告知 ナギール数[ 7-10 ] / 推定寿命[ 421-700週 ]</li>
                  <ul>
                    <li>ピーク告知後に2ナギールを与えて成長段階を見る。</li>
                    <li>成長段階を<b>「+2ナギール」</b>に入力する。</li>
                  </ul>
              </ul>
            </li>
            
            <li id="i5"><h5>特殊パターン( ピーク告知なし )</h5>
              <ul>
                <li>早熟タイプの下記寿命においては作業行程の都合でピーク期間が飛ばされるためピーク告知を受けない。</li>
                <ul>
                  <li>ナギール数[ 4 ] - 寿命[ 211-240週 ]</li>
                  <li>ナギール数[ 5 ] - 寿命[ 281-300週 ]</li>
                  <li>ナギール数[ 6 ] - 寿命[ 351-360週 ]</li>
                </ul>
                <li>
                  「無し 4」「無し 5」「無し 6」としてピーク告知にそれぞれ入力を用意した。
                </li>
                <p />
                <li>
                  判別の手段として、モンスターの大きさや成長値からピークが過ぎていることを別途確認する必要がある。
                  <p />
                  参考：
                  <a href="https://ameblo.jp/solmf2/entry-12538461030.html">
                    モンスターファーム2 育成・調査記録 - 【画像】成長段階による体格の大きさ ピーク判別
                  </a>
                  <p />
                </li>
                <li>
                  また、ピーク告知なしが発生する全てのパターンにおいて成長段階は準ピーク期間に着地している。<br />
                  そのため成長適正は準ピークとして測定すればよい。              
                </li>  
              </ul>
            </li>

            <li id="i6"><h5>資料・付録</h5>
              <p>
                調査レポート：
                <p className="text-indent">
                  <a href="https://docs.google.com/spreadsheets/d/1EcEuiRjixsY7l8I_bCqrSMH03DCjHq68NuZiyLDHqDM/edit?usp=sharing">
                    スプレッドシート(閲覧用)
                  </a>
                </p>
              </p>

              <p>
                ピークでのトレーニング上昇値：
                <p className="text-indent">
                  <a href="https://w.atwiki.jp/mf2_matome/pages/114.html">
                    モンスターファーム2@まとめwiki
                  </a>より
                </p>

                <div className="container">
                  <div className="training-inline">
                    <table className="training-inline">
                      <thead>
                        <tr><td className="head">適正</td></tr>
                      </thead>
                      <tbody>
                        <tr><td className="head">A</td></tr>
                        <tr><td className="head">B</td></tr>
                        <tr><td className="head">C</td></tr>
                        <tr><td className="head">D</td></tr>
                        <tr><td className="head">E</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="training-inline">
                    <table className="training-inline">
                      <thead>
                        <tr><td colSpan="4" className="head">軽トレ</td></tr>
                      </thead>
                      <tbody>
                        <tr><td>14</td><td>15</td><td>15</td><td>15</td></tr>
                        <tr><td>11</td><td>12</td><td>13</td><td>14</td></tr>
                        <tr><td>8</td><td>9</td><td>10</td><td>11</td></tr>
                        <tr><td>6</td><td>7</td><td>8</td><td>9</td></tr>
                        <tr><td>4</td><td>5</td><td>6</td><td>7</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="training-inline">
                    <table className="training-inline">
                      <thead>
                        <tr><td colSpan="4" className="head">重メイン</td></tr>
                      </thead>
                      <tbody>
                        <tr><td>20</td><td>20</td><td>20</td><td>20</td></tr>
                        <tr><td>19</td><td>20</td><td>20</td><td>20</td></tr>
                        <tr><td>14</td><td>15</td><td>16</td><td>17</td></tr>
                        <tr><td>11</td><td>12</td><td>13</td><td>14</td></tr>
                        <tr><td>7</td><td>8</td><td>9</td><td>10</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="training-inline">
                    <table className="training-inline">
                      <thead>
                        <tr><td colSpan="4" className="head">重サブ</td></tr>
                      </thead>
                      <tbody>
                        <tr><td>7</td><td>8</td><td>9</td><td>10</td></tr>
                        <tr><td>6</td><td>7</td><td>8</td><td>9</td></tr>
                        <tr><td>4</td><td>5</td><td>6</td><td>7</td></tr>
                        <tr><td>2</td><td>3</td><td>4</td><td>5</td></tr>
                        <tr><td>2</td><td>2</td><td>3</td><td>4</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </p>

            </li>
          </ol>
         </div>
      </div>
  )}
}

export default Usage;