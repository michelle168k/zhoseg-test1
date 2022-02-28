const nameCode =
  '<p>通常以三個字母作為代碼，如小孩代碼為 CHI，媽媽代碼為 MOT，爸爸代碼為 FAT，Helen 代碼以 HEL，若為多位小孩代碼為 CH1, CH2, CH3...，以此類推。</p>';
const language = `
  <p>語言代碼對照表</p>
  <table>
    <thead>
      <tr><th>代碼</th><th>語言</th></tr>
    </thead>
    <tbody>
      <tr><td>zho</td><td>Chinese</td></tr>
      <tr><td>zho-min</td><td>Taiwanese</td></tr>
      <tr><td>Zho-yue</td><td>Cantonese</td></tr>
      <tr><td>eng</td><td>English</td></tr>
      <tr><td>jpn</td><td>Japan</td></tr>
      <tr><td>kor</td><td>Korea</td></tr>
      <tr><td>vie</td><td>Vietnamese</td></tr>
    </tbody>
  </table>
  <style>
  table {
    border-collapse:collapse;
  }
  table, th, td {
    border: 1px solid #333;
    padding: 4px;
  }
  </style>
`;
const corpusName = '填入語料名稱，通常以一個英文單詞作為標籤。';
const age = '填寫幾歲幾個月幾天大，如 3 歲 2 個月 2 天大，則歲填 3、月填 02、天填 02。';
const group =
  '若因某些目的將語料分組，則可輸入語料組別，如自閉症組可標記 ASD、遲語兒可標記 LT、特定型語言障礙可標記 SLI、典型發展兒童可標記 TD，以此類推。';
const role = `
  <p>角色代碼對照表</p>
  <table>
    <thead>
      <tr><th>代碼</th><th>角色</th><th>代碼</th><th>角色</th></tr>
    </thead>
    <tbody>
      <tr><td>Target_Child</td><td>分析目標兒童</td><td>Caretaker</td><td>照顧孩童者</td></tr>
      <tr><td>Target_Adult</td><td>分析目標成人</td><td>Environment</td><td>環境</td></tr>
      <tr><td>Child</td><td>孩童</td><td>Group</td><td>團體</td></tr>
      <tr><td>Mother</td><td>媽媽</td><td>Unidentified</td><td>無法辨識的參與者</td></tr>
      <tr><td>Father</td><td>爸爸</td><td>Uncertain</td><td>不確定的說話者</td></tr>
      <tr><td>Brother</td><td>兄弟</td><td>Other</td><td>其他</td></tr>
      <tr><td>Sister</td><td>姊妹</td><td>Text</td><td>用於 Talkbank 的書面文字</td></tr>
      <tr><td>Sibling</td><td>手足</td><td>Media</td><td>多媒體</td></tr>
      <tr><td>Grandfather</td><td>祖父</td><td>PlayRole</td><td>扮演角色</td></tr>
      <tr><td>Grandmother</td><td>祖母</td><td>LENA</td><td>特別用於 LENA</td></tr>
      <tr><td>Relative</td><td>親戚</td><td>Justice</td><td>法官</td></tr>
      <tr><td>Participant</td><td>參與者</td><td>Attorney</td><td>律師</td></tr>
      <tr><td>Investigator</td><td>研究者</td><td>Doctor</td><td>醫生</td></tr>
      <tr><td>Partner</td><td>夥伴</td><td>Nurse</td><td>護士</td></tr>
      <tr><td>Boy</td><td>男孩</td><td>Student</td><td>學生</td></tr>
      <tr><td>Girl</td><td>女孩</td><td>Teacher</td><td>老師</td></tr>
      <tr><td>Adult</td><td>成人</td><td>Host</td><td>主持人</td></tr>
      <tr><td>Teenager</td><td>青少年</td><td>Guest</td><td>來賓</td></tr>
      <tr><td>Male</td><td>男性</td><td>Leader</td><td>領導者</td></tr>
      <tr><td>Female</td><td>女性</td><td>Member</td><td>成員</td></tr>
    </tbody>
  </table>
  <style>
  table {
    border-collapse:collapse;
  }
  table, th, td {
    border: 1px solid #333;
    padding: 4px;
  }
  </style>
`;
const education =
  '可以英文字標記或數字標記。英文字標記，國小可標記 Elem、高中可標記 HS、大專可標記 UG、研究所可標記 Grad; 數字標記，則可輸入受教育的時間(年)，如 9、12。';
const customField = '可輸入其他所需資訊';

export default {
  nameCode,
  language,
  corpusName,
  age,
  group,
  role,
  education,
  customField,
};
