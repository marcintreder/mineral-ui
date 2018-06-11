/* @flow */
import { ThemeProvider } from '../../../../../library/themes';
import Button from '../../../../../library/Button';
import {
  DialogActions,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '../../../../../library/Dialog';
import DemoLayout from '../components/DemoLayout';
import Dialog from '../components/DemoDialog';

export default {
  id: 'rtl',
  title: 'Bidirectionality',
  description: `TODO`,
  scope: {
    Button,
    DemoLayout,
    Dialog,
    DialogActions,
    DialogBody,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    ThemeProvider
  },
  source: `
    <div dir="rtl">
      <ThemeProvider theme={{ direction: 'rtl' }}>
        <DemoLayout>
          <Dialog>
            <DialogHeader>
              <DialogTitle>
                الأحكام والشروط
              </DialogTitle>
            </DialogHeader>
            <DialogBody>
              <p>
                ان يبق إستعمل بأضرار الإحتفاظ, هذا إذ ا وبالرغم. أوسع الشهيرة ٣٠ تلك, بحث ثم أوسع أجزاء, مع فصل ودول وسوء الحيلولة. عن مكن المارق واتّجه الإقتصادي, رئيس يعادل الأسيوي كان من, المحيط بتحدّي إذ جُل. تم يتم فرنسا العالم. فقد قد تمهيد الأرواح. ليركز تغييرات أخذ ما, عن جعل بمباركة الولايات.
              </p>
            </DialogBody>
            <DialogFooter>
              <DialogActions>
                <Button minimal>إلغاء</Button>
                <Button primary>قبول الشروط</Button>
              </DialogActions>
            </DialogFooter>
          </Dialog>
        </DemoLayout>
      </ThemeProvider>
    </div>`
};
