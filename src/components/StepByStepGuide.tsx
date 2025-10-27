import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Alert,
} from '@mui/material';
import {
  AutoAwesome,
  ExpandMore,
  CheckCircle,
  PlayArrow,
  LightbulbOutlined,
  WarningAmber,
} from '@mui/icons-material';
import { generateStepByStep } from '../services/geminiService';

interface StepData {
  title: string;
  description: string;
  details: string[];
  tips?: string;
  warning?: string;
}

const StepByStepGuide: React.FC = () => {
  const [task, setTask] = useState('');
  const [taskName, setTaskName] = useState('');
  const [steps, setSteps] = useState<StepData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');

  const exampleTasks = [
    'Tạo biểu đồ cột từ dữ liệu bán hàng',
    'Sử dụng VLOOKUP để tìm kiếm dữ liệu',
    'Tạo Pivot Table để phân tích dữ liệu',
    'Áp dụng Conditional Formatting theo điều kiện',
    'Tạo Dashboard báo cáo tự động',
    'Sử dụng Data Validation cho dropdown list',
  ];

  // Simulated data for different tasks
  const taskStepsData: { [key: string]: StepData[] } = {
    'biểu đồ': [
      {
        title: 'Chuẩn bị dữ liệu',
        description: 'Tổ chức dữ liệu của bạn trong Excel',
        details: [
          'Mở file Excel và chọn worksheet chứa dữ liệu',
          'Đảm bảo dữ liệu được sắp xếp theo dạng bảng với tiêu đề cột',
          'Loại bỏ các ô trống hoặc dữ liệu không hợp lệ',
          'Kiểm tra định dạng số liệu (số, văn bản, ngày tháng)',
        ],
        tips: 'Dữ liệu tốt nhất là có cấu trúc rõ ràng với tiêu đề ở hàng đầu tiên',
      },
      {
        title: 'Chọn dải dữ liệu',
        description: 'Bôi đen vùng dữ liệu cần tạo biểu đồ',
        details: [
          'Click vào ô đầu tiên của dữ liệu (bao gồm cả tiêu đề)',
          'Giữ chuột và kéo đến ô cuối cùng của dữ liệu',
          'Hoặc sử dụng phím Ctrl+Shift+End để chọn nhanh',
          'Đảm bảo đã chọn cả tiêu đề cột và tiêu đề hàng (nếu có)',
        ],
        tips: 'Bạn có thể giữ Ctrl và click để chọn nhiều vùng không liền kề',
      },
      {
        title: 'Chèn biểu đồ',
        description: 'Sử dụng tính năng Insert Chart',
        details: [
          'Vào tab "Insert" trên ribbon',
          'Trong nhóm "Charts", click vào "Column Chart"',
          'Chọn loại biểu đồ cột phù hợp (2-D Column, 3-D Column, etc.)',
          'Excel sẽ tự động tạo biểu đồ dựa trên dữ liệu đã chọn',
        ],
        tips: 'Bạn cũng có thể sử dụng phím tắt Alt+F1 để tạo biểu đồ nhanh',
      },
      {
        title: 'Tùy chỉnh biểu đồ',
        description: 'Chỉnh sửa giao diện và định dạng biểu đồ',
        details: [
          'Click vào biểu đồ để hiển thị "Chart Tools"',
          'Sử dụng tab "Design" để thay đổi kiểu biểu đồ và màu sắc',
          'Sử dụng tab "Format" để điều chỉnh chi tiết như font, border',
          'Click vào các phần tử (title, legend, axis) để chỉnh sửa riêng',
        ],
        tips: 'Sử dụng "Chart Styles" để áp dụng theme chuyên nghiệp nhanh chóng',
      },
      {
        title: 'Thêm tiêu đề và nhãn',
        description: 'Làm cho biểu đồ dễ hiểu hơn',
        details: [
          'Click vào "Chart Title" và nhập tiêu đề mô tả',
          'Thêm "Axis Titles" bằng cách click vào nút "+" bên cạnh biểu đồ',
          'Chọn "Axis Titles" và nhập tên cho trục X và Y',
          'Điều chỉnh vị trí legend (chú giải) nếu cần',
        ],
        warning: 'Tiêu đề rõ ràng giúp người xem hiểu biểu đồ nhanh hơn',
      },
      {
        title: 'Hoàn thiện và lưu',
        description: 'Kiểm tra và lưu công việc',
        details: [
          'Xem lại toàn bộ biểu đồ để đảm bảo chính xác',
          'Di chuyển và thay đổi kích thước biểu đồ nếu cần',
          'Click chuột phải vào biểu đồ > "Save as Template" để lưu mẫu',
          'Lưu file Excel (Ctrl+S)',
        ],
        tips: 'Bạn có thể copy biểu đồ sang PowerPoint hoặc Word bằng Ctrl+C và Ctrl+V',
      },
    ],
    'vlookup': [
      {
        title: 'Hiểu cấu trúc VLOOKUP',
        description: 'Nắm vững cú pháp và tham số của hàm',
        details: [
          'Cú pháp: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
          'lookup_value: Giá trị cần tìm kiếm',
          'table_array: Bảng dữ liệu chứa thông tin',
          'col_index_num: Số thứ tự cột cần lấy dữ liệu',
          '[range_lookup]: TRUE (tương đối) hoặc FALSE (chính xác)',
        ],
        tips: 'VLOOKUP chỉ tìm kiếm từ trái sang phải, cột tìm kiếm phải ở bên trái cột kết quả',
      },
      {
        title: 'Chuẩn bị dữ liệu',
        description: 'Tổ chức bảng dữ liệu tra cứu',
        details: [
          'Tạo hoặc xác định bảng tra cứu (lookup table)',
          'Đảm bảo cột đầu tiên chứa giá trị duy nhất (unique)',
          'Sắp xếp dữ liệu theo thứ tự tăng dần nếu dùng range_lookup=TRUE',
          'Kiểm tra không có ô trống trong bảng tra cứu',
        ],
        warning: 'Dữ liệu trùng lặp trong cột tra cứu sẽ chỉ trả về kết quả đầu tiên',
      },
      {
        title: 'Nhập công thức VLOOKUP',
        description: 'Viết công thức trong ô cần kết quả',
        details: [
          'Click vào ô muốn hiển thị kết quả',
          'Gõ dấu = để bắt đầu công thức',
          'Gõ VLOOKUP và mở ngoặc đơn',
          'Chọn ô chứa giá trị cần tìm (lookup_value)',
          'Gõ dấu phẩy, sau đó bôi đen toàn bộ bảng tra cứu',
        ],
        tips: 'Sử dụng F4 để thêm $ và khóa tham chiếu tuyệt đối cho table_array',
      },
      {
        title: 'Thiết lập tham số',
        description: 'Hoàn thiện các tham số còn lại',
        details: [
          'Sau table_array, gõ dấu phẩy',
          'Nhập số thứ tự cột muốn lấy giá trị (đếm từ 1)',
          'Gõ dấu phẩy và nhập FALSE hoặc 0 cho tìm kiếm chính xác',
          'Hoặc nhập TRUE hoặc 1 cho tìm kiếm tương đối',
          'Đóng ngoặc đơn và nhấn Enter',
        ],
        tips: 'Nên dùng FALSE (0) cho hầu hết trường hợp để tránh sai số',
      },
      {
        title: 'Xử lý lỗi',
        description: 'Thêm công thức xử lý lỗi #N/A',
        details: [
          'Sử dụng IFERROR để bắt lỗi: =IFERROR(VLOOKUP(...), "Không tìm thấy")',
          'Hoặc dùng IFNA (Excel 2013+): =IFNA(VLOOKUP(...), "Không có")',
          'Kiểm tra lỗi phổ biến: #N/A (không tìm thấy), #REF! (cột index sai)',
          'Đảm bảo kiểu dữ liệu lookup_value và cột tra cứu giống nhau',
        ],
        warning: 'Lỗi #N/A thường do không tìm thấy giá trị hoặc sai định dạng dữ liệu',
      },
      {
        title: 'Copy công thức',
        description: 'Áp dụng công thức cho nhiều ô',
        details: [
          'Click vào ô chứa công thức VLOOKUP đã hoàn thành',
          'Di chuột đến góc dưới phải của ô (xuất hiện dấu +)',
          'Kéo xuống hoặc kéo ngang để copy công thức',
          'Kiểm tra các ô đã copy để đảm bảo kết quả đúng',
        ],
        tips: 'Double-click vào góc dưới phải để tự động fill xuống đến ô cuối cùng có dữ liệu',
      },
    ],
    'pivot': [
      {
        title: 'Chuẩn bị dữ liệu nguồn',
        description: 'Đảm bảo dữ liệu ở dạng bảng chuẩn',
        details: [
          'Dữ liệu phải có tiêu đề cho mỗi cột',
          'Không có hàng hoặc cột trống trong bảng dữ liệu',
          'Mỗi cột chỉ chứa một loại dữ liệu (số, văn bản, ngày)',
          'Loại bỏ các merged cells (ô được gộp)',
        ],
        tips: 'Chuyển dữ liệu thành Table (Ctrl+T) để Pivot Table tự động cập nhật',
      },
      {
        title: 'Chèn Pivot Table',
        description: 'Tạo Pivot Table mới',
        details: [
          'Click vào bất kỳ ô nào trong dữ liệu',
          'Vào tab "Insert" > click "PivotTable"',
          'Trong hộp thoại, kiểm tra vùng dữ liệu đã chọn đúng',
          'Chọn vị trí đặt Pivot Table (worksheet mới hoặc hiện tại)',
          'Click OK để tạo Pivot Table',
        ],
        tips: 'Nên đặt Pivot Table ở worksheet mới để dễ quản lý',
      },
      {
        title: 'Thiết lập Rows và Columns',
        description: 'Kéo thả các trường vào vùng phù hợp',
        details: [
          'Trong panel "PivotTable Fields", chọn trường cho Rows (hàng)',
          'Kéo trường muốn hiển thị theo chiều dọc vào vùng "Rows"',
          'Kéo trường muốn hiển thị theo chiều ngang vào vùng "Columns"',
          'Có thể thêm nhiều trường vào mỗi vùng để tạo phân cấp',
        ],
        tips: 'Thử nghiệm với việc hoán đổi Rows và Columns để tìm cách hiển thị tốt nhất',
      },
      {
        title: 'Thêm Values (giá trị)',
        description: 'Chọn dữ liệu cần tính toán',
        details: [
          'Kéo trường số liệu vào vùng "Values"',
          'Mặc định Excel sẽ dùng SUM cho số và COUNT cho text',
          'Click vào trường trong Values > "Value Field Settings" để thay đổi',
          'Chọn kiểu tính toán: Sum, Average, Count, Max, Min, etc.',
          'Đặt tên cho trường Value nếu cần',
        ],
        tips: 'Bạn có thể thêm cùng một trường nhiều lần với các tính toán khác nhau',
      },
      {
        title: 'Sử dụng Filters',
        description: 'Lọc dữ liệu hiển thị trong Pivot Table',
        details: [
          'Kéo trường vào vùng "Filters" để tạo bộ lọc tổng',
          'Sử dụng dropdown ở Row/Column labels để lọc chi tiết',
          'Click vào dropdown filter > chọn "Label Filters" hoặc "Value Filters"',
          'Thiết lập điều kiện lọc theo nhu cầu',
        ],
        tips: 'Sử dụng Slicers (Insert > Slicer) để tạo bộ lọc trực quan và dễ dùng',
      },
      {
        title: 'Định dạng và tùy chỉnh',
        description: 'Làm đẹp Pivot Table',
        details: [
          'Chọn toàn bộ Pivot Table',
          'Vào tab "Design" > chọn một PivotTable Style',
          'Tích hoặc bỏ tích "Banded Rows" và "Banded Columns"',
          'Right-click vào số liệu > "Number Format" để định dạng số',
          'Sử dụng "PivotTable Options" để tùy chỉnh chi tiết',
        ],
        tips: 'Tắt "Show Grand Totals" nếu không cần hiển thị tổng cộng',
      },
      {
        title: 'Refresh và cập nhật',
        description: 'Cập nhật dữ liệu khi nguồn thay đổi',
        details: [
          'Click chuột phải vào Pivot Table > chọn "Refresh"',
          'Hoặc click vào Pivot Table > tab "Analyze" > "Refresh"',
          'Dùng "Refresh All" để cập nhật tất cả Pivot Tables',
          'Thiết lập tự động refresh khi mở file trong PivotTable Options',
        ],
        warning: 'Nhớ refresh Pivot Table sau khi thay đổi dữ liệu nguồn',
      },
    ],
    'conditional formatting': [
      {
        title: 'Chọn vùng dữ liệu',
        description: 'Bôi đen các ô cần áp dụng định dạng có điều kiện',
        details: [
          'Click vào ô đầu tiên của vùng dữ liệu',
          'Kéo chuột để chọn toàn bộ vùng cần format',
          'Hoặc click vào tiêu đề cột/hàng để chọn toàn bộ',
          'Có thể giữ Ctrl để chọn nhiều vùng không liền kề',
        ],
        tips: 'Chọn cả tiêu đề nếu muốn áp dụng format cho toàn bộ cột',
      },
      {
        title: 'Mở Conditional Formatting',
        description: 'Truy cập menu định dạng có điều kiện',
        details: [
          'Vào tab "Home" trên ribbon',
          'Tìm nhóm "Styles" ở giữa ribbon',
          'Click vào "Conditional Formatting"',
          'Menu dropdown sẽ hiển thị các tùy chọn',
        ],
        tips: 'Bạn có thể dùng phím Alt+H+L để mở menu nhanh',
      },
      {
        title: 'Chọn loại định dạng',
        description: 'Chọn quy tắc phù hợp với mục đích',
        details: [
          'Highlight Cells Rules: Làm nổi bật ô theo điều kiện cụ thể',
          'Top/Bottom Rules: Làm nổi bật giá trị cao/thấp nhất',
          'Data Bars: Hiển thị thanh màu theo giá trị',
          'Color Scales: Tô màu gradient theo giá trị',
          'Icon Sets: Hiển thị icon (mũi tên, cờ, ngôi sao...)',
        ],
        tips: 'Data Bars và Color Scales rất hữu ích cho báo cáo trực quan',
      },
      {
        title: 'Thiết lập điều kiện',
        description: 'Cấu hình điều kiện cụ thể',
        details: [
          'Chọn "Greater Than" nếu muốn highlight giá trị lớn hơn một số',
          'Chọn "Between" để highlight giá trị trong một khoảng',
          'Chọn "Equal To" để highlight giá trị bằng một giá trị cụ thể',
          'Nhập giá trị hoặc chọn ô tham chiếu',
          'Chọn màu định dạng từ dropdown',
        ],
        tips: 'Có thể tham chiếu đến ô khác để điều kiện tự động cập nhật',
      },
      {
        title: 'Tạo quy tắc tùy chỉnh',
        description: 'Sử dụng công thức cho điều kiện phức tạp',
        details: [
          'Chọn "New Rule" > "Use a formula to determine..."',
          'Nhập công thức trả về TRUE/FALSE (ví dụ: =A1>100)',
          'Click "Format" để chọn định dạng áp dụng',
          'Chọn màu nền, màu chữ, border, font... theo ý muốn',
          'Click OK để áp dụng',
        ],
        warning: 'Công thức phải bắt đầu bằng dấu = và trả về TRUE hoặc FALSE',
      },
      {
        title: 'Quản lý quy tắc',
        description: 'Chỉnh sửa, xóa hoặc sắp xếp quy tắc',
        details: [
          'Vào Conditional Formatting > "Manage Rules"',
          'Xem tất cả quy tắc đang áp dụng',
          'Sử dụng mũi tên lên/xuống để thay đổi thứ tự ưu tiên',
          'Click "Edit Rule" để chỉnh sửa quy tắc',
          'Click "Delete Rule" để xóa quy tắc không cần',
        ],
        tips: 'Quy tắc ở trên cùng có độ ưu tiên cao nhất',
      },
      {
        title: 'Test và tinh chỉnh',
        description: 'Kiểm tra và điều chỉnh kết quả',
        details: [
          'Thay đổi giá trị trong ô để xem format có hoạt động đúng',
          'Nếu không đúng, vào Manage Rules để chỉnh sửa',
          'Có thể tích "Stop If True" để ngăn quy tắc tiếp theo',
          'Sử dụng "Clear Rules" để xóa tất cả format trong vùng',
        ],
        tips: 'Copy format sang vùng khác bằng Format Painter (Alt+H+F+P)',
      },
    ],
    'dashboard': [
      {
        title: 'Lập kế hoạch Dashboard',
        description: 'Xác định mục tiêu và các chỉ số cần hiển thị',
        details: [
          'Xác định đối tượng sử dụng Dashboard (quản lý, nhân viên, khách hàng)',
          'Liệt kê các KPI (Key Performance Indicators) quan trọng',
          'Quyết định loại biểu đồ phù hợp cho từng chỉ số',
          'Vẽ sketch layout trên giấy hoặc tool thiết kế',
        ],
        tips: 'Dashboard tốt là Dashboard đơn giản, dễ đọc và cung cấp insight nhanh',
      },
      {
        title: 'Chuẩn bị và làm sạch dữ liệu',
        description: 'Tổ chức dữ liệu nguồn',
        details: [
          'Tạo một worksheet riêng tên "Data" chứa dữ liệu thô',
          'Làm sạch dữ liệu: loại bỏ duplicate, sửa lỗi, điền missing values',
          'Tạo worksheet "Calculations" cho các công thức trung gian',
          'Sử dụng Table (Ctrl+T) để dữ liệu tự động expand',
        ],
        tips: 'Tách biệt dữ liệu thô và dashboard để dễ bảo trì',
      },
      {
        title: 'Tạo các Pivot Tables',
        description: 'Phân tích và tổng hợp dữ liệu',
        details: [
          'Tạo Pivot Tables cho từng chỉ số cần hiển thị',
          'Đặt tất cả Pivot Tables trong một worksheet riêng tên "PivotTables"',
          'Tính toán các metrics: tổng, trung bình, tỷ lệ tăng trưởng...',
          'Sử dụng Calculated Fields nếu cần công thức phức tạp',
        ],
        tips: 'Đặt tên có ý nghĩa cho từng Pivot Table để dễ quản lý',
      },
      {
        title: 'Tạo các biểu đồ',
        description: 'Visualize dữ liệu bằng charts',
        details: [
          'Từ các Pivot Tables, tạo các biểu đồ tương ứng',
          'Chọn loại biểu đồ phù hợp: Line (xu hướng), Column (so sánh), Pie (tỷ lệ)',
          'Loại bỏ các elements không cần thiết (gridlines, legend...)',
          'Sử dụng màu sắc nhất quán cho toàn bộ Dashboard',
        ],
        warning: 'Tránh dùng quá nhiều loại biểu đồ khác nhau trong một Dashboard',
      },
      {
        title: 'Thiết kế layout Dashboard',
        description: 'Sắp xếp các elements trên Dashboard worksheet',
        details: [
          'Tạo worksheet mới tên "Dashboard"',
          'Ẩn gridlines: View > bỏ tích Gridlines',
          'Tạo header với tiêu đề và logo (nếu có)',
          'Sắp xếp biểu đồ theo thứ tự quan trọng: từ trái sang phải, trên xuống dưới',
          'Để lại khoảng trắng hợp lý giữa các elements',
        ],
        tips: 'Sử dụng hình chữ nhật làm background để tạo sections rõ ràng',
      },
      {
        title: 'Thêm Slicers và Filters',
        description: 'Tạo tính tương tác cho Dashboard',
        details: [
          'Chọn một Pivot Table > Insert > Slicer',
          'Chọn các trường muốn filter (Date, Category, Region...)',
          'Connect Slicer với tất cả Pivot Tables liên quan',
          'Định dạng Slicer: thay đổi màu, kích thước, số cột',
          'Đặt Slicers ở vị trí dễ thấy, thường ở đầu Dashboard',
        ],
        tips: 'Sử dụng Timeline Slicer cho dữ liệu theo thời gian',
      },
      {
        title: 'Thêm KPI Cards',
        description: 'Hiển thị các chỉ số quan trọng',
        details: [
          'Tạo các hình chữ nhật làm background cho KPI cards',
          'Sử dụng công thức GETPIVOTDATA để lấy giá trị từ Pivot Tables',
          'Format số lớn, in đậm, màu nổi bật',
          'Thêm label nhỏ bên dưới giải thích KPI',
          'Thêm icon hoặc indicator (mũi tên lên/xuống, màu đỏ/xanh)',
        ],
        tips: 'Sử dụng Conditional Formatting với icon sets cho indicator tự động',
      },
      {
        title: 'Hoàn thiện và test',
        description: 'Kiểm tra và tối ưu Dashboard',
        details: [
          'Ẩn tất cả worksheets không cần thiết (Data, Calculations, PivotTables)',
          'Bảo vệ worksheet Dashboard để tránh chỉnh sửa nhầm',
          'Test tất cả Slicers và Filters',
          'Thay đổi dữ liệu nguồn và Refresh All để kiểm tra tự động hóa',
          'Thu thập feedback từ users và cải thiện',
        ],
        tips: 'Tạo button "Refresh Data" bằng Shapes + Assign Macro để user dễ cập nhật',
      },
    ],
    'data validation': [
      {
        title: 'Chọn ô cần validation',
        description: 'Xác định vùng áp dụng Data Validation',
        details: [
          'Click vào ô hoặc bôi đen nhóm ô cần áp dụng',
          'Có thể chọn toàn bộ cột bằng cách click vào header',
          'Giữ Ctrl để chọn nhiều vùng không liền kề',
        ],
        tips: 'Nên áp dụng cho toàn bộ cột nếu đó là field nhập liệu',
      },
      {
        title: 'Mở Data Validation',
        description: 'Truy cập công cụ Data Validation',
        details: [
          'Vào tab "Data" trên ribbon',
          'Trong nhóm "Data Tools", tìm "Data Validation"',
          'Click vào "Data Validation"',
          'Hộp thoại Data Validation sẽ mở ra',
        ],
        tips: 'Phím tắt Alt+A+V+V để mở nhanh',
      },
      {
        title: 'Chọn loại validation',
        description: 'Thiết lập tiêu chí cho dữ liệu hợp lệ',
        details: [
          'Trong tab "Settings", click dropdown "Allow"',
          'Chọn "List" để tạo dropdown list',
          'Hoặc chọn: Whole number, Decimal, Date, Time, Text length, Custom',
          'Mỗi loại sẽ có các options khác nhau',
        ],
        tips: 'List là loại phổ biến nhất cho dropdown menu',
      },
      {
        title: 'Nhập dữ liệu cho List',
        description: 'Cung cấp danh sách giá trị cho dropdown',
        details: [
          'Với "List", có 2 cách nhập dữ liệu:',
          'Cách 1: Gõ trực tiếp vào ô "Source", các giá trị cách nhau bởi dấu phẩy',
          'Cách 2: Click vào icon ô "Source" và chọn range chứa danh sách',
          'Ví dụ: =Sheet2!$A$1:$A$10',
          'Đảm bảo tích "In-cell dropdown"',
        ],
        tips: 'Cách 2 linh hoạt hơn vì có thể cập nhật list mà không sửa validation',
      },
      {
        title: 'Tạo Input Message',
        description: 'Thêm hướng dẫn cho người dùng',
        details: [
          'Chuyển sang tab "Input Message"',
          'Tích "Show input message when cell is selected"',
          'Nhập "Title" cho message (VD: "Hướng dẫn")',
          'Nhập "Input message" với nội dung chi tiết',
          'Message này sẽ hiện khi user click vào ô',
        ],
        tips: 'Input message giúp user biết cần nhập gì trước khi họ nhập sai',
      },
      {
        title: 'Thiết lập Error Alert',
        description: 'Cảnh báo khi nhập sai',
        details: [
          'Chuyển sang tab "Error Alert"',
          'Tích "Show error alert after invalid data is entered"',
          'Chọn "Style": Stop (cấm), Warning (cảnh báo), Information (thông tin)',
          'Nhập "Title" cho error alert',
          'Nhập "Error message" mô tả lỗi',
        ],
        warning: 'Style "Stop" sẽ không cho phép nhập dữ liệu sai, các style khác chỉ cảnh báo',
      },
      {
        title: 'Test và hoàn thiện',
        description: 'Kiểm tra Data Validation hoạt động',
        details: [
          'Click OK để áp dụng Data Validation',
          'Click vào ô đã áp dụng validation',
          'Kiểm tra Input Message có hiện không',
          'Thử nhập dữ liệu hợp lệ và không hợp lệ',
          'Kiểm tra Error Alert có hiển thị đúng không',
          'Điều chỉnh lại nếu cần bằng cách mở lại Data Validation',
        ],
        tips: 'Có thể copy validation sang ô khác bằng Format Painter hoặc Copy-Paste Special',
      },
    ],
  };

  const handleGenerate = async () => {
    if (!task.trim()) return;

    setIsLoading(true);
    setSteps([]);
    setActiveStep(0);
    setError('');

    try {
      // Call Gemini API với JSON output
      const result = await generateStepByStep(task);
      
      setTaskName(result.taskName);
      setSteps(result.steps);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi!');
      
      // Fallback: Use demo data if API fails
      const taskLower = task.toLowerCase();
      let selectedSteps: StepData[] = [];
      
      if (taskLower.includes('biểu đồ') || taskLower.includes('chart') || taskLower.includes('cột')) {
        selectedSteps = taskStepsData['biểu đồ'];
      } else if (taskLower.includes('vlookup') || taskLower.includes('tìm kiếm')) {
        selectedSteps = taskStepsData['vlookup'];
      } else if (taskLower.includes('pivot') || taskLower.includes('phân tích')) {
        selectedSteps = taskStepsData['pivot'];
      } else if (taskLower.includes('conditional') || taskLower.includes('formatting') || taskLower.includes('định dạng')) {
        selectedSteps = taskStepsData['conditional formatting'];
      } else if (taskLower.includes('dashboard') || taskLower.includes('báo cáo')) {
        selectedSteps = taskStepsData['dashboard'];
      } else if (taskLower.includes('validation') || taskLower.includes('dropdown')) {
        selectedSteps = taskStepsData['data validation'];
      } else {
        selectedSteps = taskStepsData['biểu đồ'];
      }
      
      setSteps(selectedSteps);
      setTaskName(task);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setTask(example);
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#f9fafb' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              mb: 2,
              color: '#111827',
            }}
          >
            Hướng Dẫn Step by Step
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#6b7280',
              fontWeight: 400,
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Mô tả task bạn muốn thực hiện, AI sẽ hướng dẫn từng bước chi tiết
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Input Section */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                position: 'sticky',
                top: 20,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#111827' }}>
                  Mô tả task của bạn
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Ví dụ: Tôi muốn tạo một biểu đồ cột để hiển thị doanh thu theo tháng..."
                  variant="outlined"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#ffffff',
                    },
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleGenerate}
                  disabled={isLoading || !task.trim()}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <AutoAwesome />}
                  sx={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: '#059669',
                    },
                  }}
                >
                  {isLoading ? 'Đang tạo hướng dẫn...' : 'Tạo hướng dẫn'}
                </Button>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ mb: 2, color: '#6b7280', fontWeight: 500 }}>
                    Ví dụ nhanh:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {exampleTasks.map((example, index) => (
                      <Chip
                        key={index}
                        label={example}
                        onClick={() => handleExampleClick(example)}
                        size="small"
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: '#e5e7eb',
                          '&:hover': {
                            backgroundColor: '#d1d5db',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Steps Section */}
          <Grid item xs={12} md={7}>
            {error && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                {error} - Đang hiển thị dữ liệu demo.
              </Alert>
            )}

            {steps.length > 0 ? (
              <Box>
                {/* Progress Overview */}
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    mb: 3,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
                        {steps.length} bước để hoàn thành
                      </Typography>
                      <CheckCircle sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                      Làm theo từng bước dưới đây để đạt kết quả tốt nhất
                    </Typography>
                  </CardContent>
                </Card>

                {/* Stepper */}
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                      {steps.map((step, index) => (
                        <Step key={index}>
                          <StepLabel
                            StepIconProps={{
                              sx: {
                                '&.Mui-active': { color: '#10b981' },
                                '&.Mui-completed': { color: '#10b981' },
                              },
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: '#111827',
                                fontSize: '1.1rem',
                              }}
                            >
                              {step.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
                              {step.description}
                            </Typography>
                          </StepLabel>
                          <StepContent>
                            <Box sx={{ mb: 2 }}>
                              {/* Details */}
                              <Paper sx={{ p: 2, backgroundColor: '#f9fafb', mb: 2 }}>
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: 600, mb: 1.5, color: '#111827' }}
                                >
                                  Chi tiết thực hiện:
                                </Typography>
                                {step.details.map((detail, idx) => (
                                  <Box
                                    key={idx}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      mb: 1,
                                    }}
                                  >
                                    <PlayArrow
                                      sx={{
                                        fontSize: 16,
                                        color: '#10b981',
                                        mt: 0.3,
                                        mr: 1,
                                        flexShrink: 0,
                                      }}
                                    />
                                    <Typography variant="body2" sx={{ color: '#374151', lineHeight: 1.6 }}>
                                      {detail}
                                    </Typography>
                                  </Box>
                                ))}
                              </Paper>

                              {/* Tips */}
                              {step.tips && (
                                <Paper
                                  sx={{
                                    p: 2,
                                    backgroundColor: '#eff6ff',
                                    border: '1px solid #bfdbfe',
                                    mb: 2,
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <LightbulbOutlined
                                      sx={{ color: '#3b82f6', fontSize: 20, mr: 1, mt: 0.2 }}
                                    />
                                    <Box>
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600, color: '#1e40af', mb: 0.5 }}
                                      >
                                        💡 Mẹo hữu ích:
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: '#1e40af' }}>
                                        {step.tips}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Paper>
                              )}

                              {/* Warning */}
                              {step.warning && (
                                <Paper
                                  sx={{
                                    p: 2,
                                    backgroundColor: '#fef3c7',
                                    border: '1px solid #fde047',
                                    mb: 2,
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <WarningAmber
                                      sx={{ color: '#d97706', fontSize: 20, mr: 1, mt: 0.2 }}
                                    />
                                    <Box>
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600, color: '#92400e', mb: 0.5 }}
                                      >
                                        ⚠️ Lưu ý:
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: '#92400e' }}>
                                        {step.warning}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Paper>
                              )}
                            </Box>

                            <Box sx={{ mb: 2 }}>
                              <Button
                                variant="contained"
                                onClick={() => setActiveStep(index + 1)}
                                disabled={index === steps.length - 1}
                                sx={{
                                  mr: 1,
                                  backgroundColor: '#10b981',
                                  '&:hover': { backgroundColor: '#059669' },
                                }}
                              >
                                {index === steps.length - 1 ? 'Hoàn thành' : 'Bước tiếp theo'}
                              </Button>
                              {index > 0 && (
                                <Button
                                  onClick={() => setActiveStep(index - 1)}
                                  sx={{ color: '#6b7280' }}
                                >
                                  Quay lại
                                </Button>
                              )}
                            </Box>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>

                    {activeStep === steps.length && (
                      <Paper
                        sx={{
                          p: 3,
                          mt: 3,
                          backgroundColor: '#d1fae5',
                          border: '2px solid #10b981',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <CheckCircle sx={{ color: '#10b981', fontSize: 32, mr: 2 }} />
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#065f46' }}>
                            Hoàn thành! 🎉
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: '#065f46', mb: 2 }}>
                          Bạn đã hoàn thành tất cả các bước. Hy vọng hướng dẫn này hữu ích!
                        </Typography>
                        <Button
                          onClick={() => setActiveStep(0)}
                          variant="outlined"
                          sx={{
                            borderColor: '#10b981',
                            color: '#10b981',
                            '&:hover': {
                              borderColor: '#059669',
                              backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            },
                          }}
                        >
                          Xem lại từ đầu
                        </Button>
                      </Paper>
                    )}
                  </CardContent>
                </Card>
              </Box>
            ) : (
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  minHeight: '500px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CardContent>
                  <Box sx={{ textAlign: 'center', p: 4 }}>
                    <AutoAwesome
                      sx={{
                        fontSize: 64,
                        color: '#d1d5db',
                        mb: 2,
                      }}
                    />
                    <Typography variant="h6" sx={{ color: '#9ca3af', mb: 1 }}>
                      Hướng dẫn chi tiết sẽ xuất hiện ở đây
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                      Mô tả task bạn muốn thực hiện và nhấn "Tạo hướng dẫn"
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StepByStepGuide;

